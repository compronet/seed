'use strict';

/**
 * Module dependencies.
 */
var passport = require('passport');
var JwtStrategy = require('passport-jwt').Strategy;
var ExtractJwt = require('passport-jwt').ExtractJwt;
var User = require('mongoose').model('User');
var config = require('../config');
module.exports = function() {
	var opts = {}
	opts.jwtFromRequest = ExtractJwt.fromAuthHeader();
	opts.secretOrKey = config.sessionSecret;
	opts.issuer = "seed.compronet.io";
	opts.audience = "compronet.io";
	passport.use(new JwtStrategy(opts, function(jwt_payload, done) {
		User.findOne({id: jwt_payload.sub}, function(err, user) {
			if (err) {
				return done(err);
			}

			if (!user) {
				return done(null, false, {
					message: 'Unknown user or invalid password'
				});
			}

			if (!user.authenticate(password)) {
				return done(null, false, {
					message: 'Unknown user or invalid password'
				});
			}

			return done(null, user);
		});
	}));
};
