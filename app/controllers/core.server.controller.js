'use strict';

var config = require('../../config/config');

/**
 * Module dependencies.
 */
exports.index = function(req, res) {
	//TODO: render login page on missing auth
	res.render('index', {
		user: req.user || null,
		rootTopic: config.mqtt.rootTopic,
		request: req
	});
};
