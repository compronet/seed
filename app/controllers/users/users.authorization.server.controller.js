'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var config = require('../../../config/config');
var jwtCtrl = require('../jwt.server.controller');

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
	
	jwtCtrl.verifyToken(req,function(err,user){
		if(err)return res.status(401).send({
			message: 'User is not logged in'
		});
		req.user = user;
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
