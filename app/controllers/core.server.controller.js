'use strict';

var config = require('../../config/config');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	res.render('index', {
		user: req.user || null,
		rootTopic: config.mqtt.rootTopic,
		request: req
	});
};
