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
var Collection = mongoose.model('App');

/**
 * Create a new element
 */
exports.create = function(req, res) {
	baseController.create(req, res, Collection);
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
	baseController.update(req, res);
};

/**
 * Delete an element
 */
exports.delete = function(req, res) {
	baseController.delete(req, res);
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
 * List of elements
 */
exports.appByDeviceID = function(req, res) {
	var query = Collection.find({'device':req.params.deviceId});
	baseController.list(req, res, query);
};


/**
 * Element middleware
 */
exports.appByID = function(req, res, next) {
	var query = Collection.findById(req.params.appId).populate('user', 'displayName')
		.populate('device', 'manufacturer model');

	baseController.elementByID(req, res, next, query);
};
