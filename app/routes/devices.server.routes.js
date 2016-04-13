'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var devices = require('../../app/controllers/devices.server.controller');
	var base = require('../../app/controllers/base.controller');

	// Devices Routes
	app.route('/devices')
		.get(devices.list)
		.post(users.requiresLogin, devices.create);

	app.route('/devices/count')
		.get(devices.count);

	app.route('/devices/:deviceId')
		.get(devices.read)
		.put(users.requiresLogin, base.hasAuthorization, devices.update)
		.delete(users.requiresLogin, base.hasAuthorization, devices.delete);

	// Finish by binding the Device middleware
	app.param('deviceId', devices.deviceByID);
};
