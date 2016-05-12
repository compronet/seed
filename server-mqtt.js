'use strict';

/**
 * Module dependencies.
 */
require('./config/init')();
var config = require('./config/config');
var chalk = require('chalk');
var mongoose = require('mongoose');
var path = require('path');
var mqtt = require('mqtt');

/**
 * Main application entry file.
 * Please note that the order of loading is important.
 */

// Bootstrap db connection
var db = mongoose.connect(config.db, function(err) {
	if (err) {
		console.error(chalk.red('Could not connect to MongoDB!'));
		console.log(chalk.red(err));
	}
});

require('./config/express')(db);

// Globbing model files
config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
	require(path.resolve(modelPath));
});

var mqttSrv = require('./config/mosca')();
var client = mqtt.connect('mqtt://localhost');

//start the ping monitoring for devices
require('./app/utils/ping')(mqttSrv, client);

console.log('MQTT application started');
