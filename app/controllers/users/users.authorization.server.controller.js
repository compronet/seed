'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../../../config/config');
var jwt = require('jsonwebtoken');

/**
 * User middleware
 */
exports.userByID = function(req, res, next, id) {
	User.findOne({
		_id: id
	}).exec(function(err, user) {
		if (err) {
			return next(err);
		}

		if (!user) {
			return next(new Error('Failed to load User ' + id));
		}

		req.profile = user;
		next();
	});
};

/**
 * Require login routing middleware
 */
/*
exports.requiresLogin = function(req, res, next) {
	if (!req.isAuthenticated()) {
		return res.status(401).send({
			message: 'User is not logged in'
		});
	}
	next();
};
*/

exports.requiresLogin = function(req,res,next){
	console.log(req.headers, req.cookies);
	var token;
	///get the authorization token from the request headers, or from a cookie
	if (req.headers && req.headers.authorization) {
		var parts = req.headers.authorization.split(' ');
		if (parts.length == 2) {
			var scheme = parts[0];
			var credentials = parts[1];

			if (/^Bearer$/i.test(scheme)) {
				token = credentials;
			}
		}
	}else if(req.cookies && req.cookies.token){
		token = req.cookies.token;
	}

	jwt.verify(token, config.sessionSecret, function(err, decoded) {
	 	if(err)return res.status(401).send({
			message: 'User is not logged in'
		});
		next();
	});
};

/**
 * User authorizations routing middleware
 */
exports.hasAuthorization = function(roles) {
	var _this = this;

	return function(req, res, next) {
		_this.requiresLogin(req, res, function() {
			if (_.intersection(req.user.roles, roles).length) {
				return next();
			} else {
				return res.status(403).send({
					message: 'User is not authorized'
				});
			}
		});
	};
};
