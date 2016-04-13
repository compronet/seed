'use strict';

var _ = require('lodash');
var errorHandler = require('./errors.server.controller');

/**
 * Helper function for errors
 */
var handleError = function(res, err) {
	return res.status(400).send({
		message: errorHandler.getErrorMessage(err)
	});
};

/**
 * Make filter for the list query
 */
exports.makeFilter = function(filter) {
	var newFilter = {};
	for (var key in filter) {
		if (filter[key].length > 0) {
			newFilter[key] = new RegExp(filter[key], 'i');
		}
	}

	return newFilter;
};

/**
 * Create a new element
 */
exports.create = function(req, res, Collection) {
	var element = new Collection(req.body);
	element.user = req.user;

	element.saveAsync()
		.then(function(result) {
			res.jsonp(result);
		})
		.catch(function(err) {
			handleError(res, err);
		});
};

/**
 * Update an element
 */
exports.update = function(req, res) {
	var element = _.extend(req.element, req.body);

	element.saveAsync()
		.then(function(result) {
			res.jsonp(result);
		})
		.catch(function(err) {
			handleError(res, err);
		});
};

/**
 * Delete an element
 */
exports.delete = function(req, res) {
	var element = req.element;

	element.removeAsync()
		.then(function(result) {
			res.jsonp(result);
		})
		.catch(function(err) {
			handleError(res, err);
		});
};

/**
 * List of elements
 */
exports.list = function(req, res, query) {
	query.execAsync()
		.then(function(elements) {
			res.jsonp(elements);
		})
		.catch(function(err) {
			handleError(res, err);
		});
};

/**
 * Count of elements
 */
exports.count = function(req, res, query) {
	query.execAsync()
		.then(function(count) {
			res.jsonp({
				count: count
			});
		})
		.catch(function(err) {
			handleError(res, err);
		});
};

/**
 * Element middleware
 */
exports.elementByID = function(req, res, next, query) {
	query.execAsync()
		.then(function(element) {
			if (!element) {
				return next(new Error('Failed to load element'));
			}

			req.element = element;
			next();
		})
		.catch(function(err) {
			return next(err);
		});
};

/**
 * Element authorization middleware
 */
exports.hasAuthorization = function(req, res, next) {
	if (req.element.user.id !== req.user.id) {
		return res.status(403).send('User is not authorized');
	}

	next();
};
