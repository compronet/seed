'use strict';

/**
 * Module dependencies.
 */
var Promise = require('bluebird');
Promise.config({
	// Enables all warnings except forgotten return statements.
	warnings: {
		wForgottenReturn: false
	}
});
var mongoose = Promise.promisifyAll(require('mongoose'));
var baseController = require('./base.controller');
var Collection = mongoose.model('Device');
var config = require('../../config/config');
/**
 * Create a new element
 */
exports.create = function(req, res) {
	baseController.create(req, res, Collection, function(result){
		publishDeviceUpdate(req.app);
		res.jsonp(result);
	});
};

/**
 * Show the current element
 */
exports.read = function(req, res) {
	res.jsonp(req.element);
};

/**
 * Update an element
 */
exports.update = function(req, res) {
	baseController.update(req, res, function(result){
		publishDeviceUpdate(req.app);
		res.jsonp(result);
	});
};

/**
 * Delete an element
 */
exports.delete = function(req, res) {
	baseController.delete(req, res, function(result){
		publishDeviceUpdate(req.app);
		res.jsonp(result);
	});
};

/**
 * List of elements
 */
exports.list = function(req, res) {
	var limit = req.query.limit || '';
	var skip = req.query.offset || 0;
	var orderBy = req.query.orderBy || '-created';
	var filter = req.query.filter ? baseController.makeFilter(JSON.parse(req.query.filter)) : {};

	var query = Collection.find(filter).skip(skip).limit(limit).sort(orderBy).populate('user', 'displayName');

	baseController.list(req, res, query);
};

/**
 * Count of elements
 */
exports.count = function(req, res) {
	var filter = req.query.filter ? baseController.makeFilter(JSON.parse(req.query.filter)) : {};
	var query = Collection.count(filter);

	baseController.count(req, res, query);
};

/**
 * Element middleware
 */
exports.deviceByID = function(req, res, next) {
	var query = Collection.findById(req.params.deviceId).populate('user', 'displayName');

	baseController.elementByID(req, res, next, query);
};

function publishDeviceUpdate(app){
	try{
		var client = app.get('mqtt');
		client.publish(config.mqtt.rootTopic+'/device/update',JSON.stringify({'message':'test'}));
	}catch(e){
		console.log(e);
	}
}
