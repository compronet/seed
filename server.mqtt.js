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
var uuid = require('uuid');


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

var mqttSrv = require('./config/mosca')();
var appId = 'mqttjs_' + uuid.v1();
var mqttOptions = {
	clientId: appId
};
console.log('connecting ' + mqttOptions.clientId);
var mqttClient = mqtt.connect('mqtt://' + config.mqtt.url, mqttOptions);

var subscriptionTopic = config.mqtt.rootTopic + '/#';
mqttClient.on('connect', function(connack) {
	console.log(appId + ' subscribing: ' + config.mqtt.rootTopic + '/device/update');

	mqttClient.subscribe(config.mqtt.rootTopic + '/device/update');
	//mqttClient.subscribe(subscriptionTopic);
});
/*
mqttClient.on('close', function() {
	console.log(appId+' unsubscribing: ' + subscriptionTopic);
	mqttClient.unsubscribe(subscriptionTopic);
});
*/
var app = require('./config/express')(db);

// Globbing model files
config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
	require(path.resolve(modelPath));
});



//start the ping monitoring for devices
require('./app/utils/ping')(mqttSrv, mqttClient);

console.log('MQTT application started');
