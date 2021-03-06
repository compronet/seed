'use strict';

var config = require('../../config/config');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	if (typeof req.user === 'undefined') {
		res.render('login', {
			user: null,
			rootTopic: config.mqtt.rootTopic,
			request: req
		});
	} else {
		res.render('index', {
			user: req.user,
			rootTopic: config.mqtt.rootTopic,
			request: req
		});
	}
};
