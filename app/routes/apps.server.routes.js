'use strict';

module.exports = function(app) {
	var users = require('../../app/controllers/users.server.controller');
	var apps = require('../../app/controllers/apps.server.controller');
	var base = require('../../app/controllers/base.controller');

	// Apps Routes
	app.route('/apps')
		.get(users.requiresLogin, apps.list)
		.post(users.requiresLogin, apps.create);

	app.route('/apps/count')
		.get(users.requiresLogin, apps.count);

	app.route('/apps/device/:deviceId').get(users.requiresLogin, base.hasAuthorization, apps.appByDeviceID);

	app.route('/apps/:appId')
		.get(users.requiresLogin, base.hasAuthorization, apps.read)
		.put(users.requiresLogin, base.hasAuthorization, apps.update)
		.delete(users.requiresLogin, base.hasAuthorization, apps.delete);

	// Finish by binding the App middleware
	app.param('appId', apps.appByID);
};
