'use strict';
/**
 * Module dependencies.
 */
require('./config/init')();
var config = require('./config/config');
var mongoose = require('mongoose');
var chalk = require('chalk');
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

// Connect as Mqtt Client
//TODO: extend mqtt.connect for user auth with app
/*var mqttOptions = {
 port:1883,
 username:'appuser',
 password:'iloveapp',
 clientId: 'serverjs_'+uuid.v1(),
 clear:false
 }*/
var appId = 'meanjs_' + uuid.v1();
var mqttOptions = {
	clientId: appId
};
console.log('connecting ', mqttOptions.clientId);
var mqttClient = mqtt.connect('mqtt://' + config.mqtt.url, mqttOptions);
var subscriptionTopic = config.mqtt.rootTopic + '/#';
mqttClient.on('connect', function(/*connack*/) {
	console.log(appId + ' subscribing: ' + subscriptionTopic);
	mqttClient.subscribe(subscriptionTopic);
});
/*
mqttClient.on('close', function() {
	console.log(appId+' unsubscribing: ' + subscriptionTopic);
	mqttClient.unsubscribe(subscriptionTopic);
});
*/

// Init the express application
var app = require('./config/express')(db, mqttClient);

mqttClient.on('message', function(topic, msgBuffer) {
	var msgStr = msgBuffer.toString();
	try {
		var message = JSON.parse(msgStr);
		app.io.emit(topic, message);
	} catch (e) {
		console.log(e);
	}
});

// Bootstrap passport config
require('./config/passport')();

// Start the app by listening on <port>
app.listen(config.port);

// Expose app
exports = module.exports = app;

// Logging initialization
console.log('MEAN.JS application started on port ' + config.port);
