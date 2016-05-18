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
var Users = mongoose.model('User');

/**
 * Approve a user
 */
exports.approve = function(req, res) {

	// Check if params are set
	if (typeof req.body.approved === 'undefined' || typeof req.body._id === 'undefined') {
		res.status(400).send({
			message: 'Approved or _id param is missing'
		});
	}

	// Find user and update
	Users.findOneAndUpdate({ _id: req.body._id }, { approved: req.body.approved }).execAsync()
		.then(function(savedUser) {
			if (!savedUser) {
				res.status(400).send({
					message: 'Failed to load user'
				});
			} else {
				res.json(savedUser);
			}
		})
		.catch(function(err) {
			res.status(400).send({
				message: err.message
			});
		});
};

/**
 * List all users
 */
exports.list = function(req, res) {
	Users.findAsync()
		.then(function(users) {
			res.jsonp(users);
		})
		.catch(function(err) {
			res.status(400).send({
				message: err.message
			});
		});
};
