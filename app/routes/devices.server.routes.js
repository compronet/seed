'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var devices = require('../../app/controllers/devices.server.controller');
	var base = require('../../app/controllers/base.controller');

	// Devices Routes
	app.route('/devices')
		.get(users.requiresLogin, devices.list)
		.post(users.requiresLogin, devices.create);

	app.route('/devices/count')
		.get(users.requiresLogin, devices.count);

	app.route('/devices/:deviceId')
		.get(users.requiresLogin, base.hasAuthorization, devices.read)
		.put(users.requiresLogin, base.hasAuthorization, devices.update)
		.delete(users.requiresLogin, base.hasAuthorization, devices.delete);

	// Finish by binding the Device middleware
	app.param('deviceId', devices.deviceByID);
};
