'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
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

	if (typeof req.body.apps !== 'undefined') {
		var deviceId = mongoose.Types.ObjectId();
		var appIds = _.map(req.body.apps, '_id');
		handleApps(deviceId, appIds, function() {
			req.body._id = deviceId;
			baseController.create(req, res, Collection, updated);
		});
	} else {
		baseController.create(req, res, Collection, updated);
	}
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
	if (typeof req.body.apps !== 'undefined') {
		var deviceId = req.body._id;
		var appIds = _.map(req.body.apps, '_id');
		handleApps(deviceId, appIds, function() {
			baseController.update(req, res, updated);
		});
	} else {
		baseController.update(req, res, updated);
	}
};

var updated = function(result, req, res) {
		res.jsonp(result);
		publishDeviceUpdate(req.app);

	};

function handleApps(deviceId, appIds, next) {
	var App = mongoose.model('App');

	// Delete device from apps
	App.updateAsync(
		{ device: deviceId },
		{ $set: { device: null } },
		{ multi: true }
	).then(function() {

		//Add new device to apps
		App.updateAsync(
			{ _id: { $in: appIds } },
			{ device: deviceId },
			{ multi: true }
		).then(function() {
			next();
		});
	});
}

/**
 * Delete an element
 */
exports.delete = function(req, res) {
	baseController.delete(req, res, updated);
};

/**
 * List of elements
 */
exports.list = function(req, res) {
	var limit = req.query.limit || '';
	var skip = req.query.offset || 0;
	var orderBy = req.query.orderBy || '-created';
	var queryFilter = req.query.filter ? JSON.parse(req.query.filter) : {};
	var filter = baseController.makeFilter(queryFilter, req.user, req.query.onlyOwn);

	var query = Collection.find(filter).skip(skip).limit(limit).sort(orderBy).populate('user', 'displayName');

	baseController.list(req, res, query);
};

/**
 * Count of elements
 */
exports.count = function(req, res) {
	var queryFilter = req.query.filter ? JSON.parse(req.query.filter) : {};
	var filter = baseController.makeFilter(queryFilter, req.user, req.query.onlyOwn);
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

function publishDeviceUpdate(app) {
	try {
		var mqttClient = app.get('mqttClient');
		mqttClient.publish(config.mqtt.rootTopic + '/device/update', JSON.stringify({ message: 'test' }));
	} catch (e) {
		console.log(e);
	}
}
