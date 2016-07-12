'use strict';

var config = require('../../config/config');

// Create the chat configuration
module.exports = function(client, io, socket, sessionID) {

	client.on('connect', function(connack) {
		client.subscribe(config.mqtt.rootTopic + '/device/#');
	});

	client.on('close', function() {
		client.unsubscribe(config.mqtt.rootTopic + '/device/#');
	});

	client.on('message', function(topic, msgBuffer/*, data*/) {
		var msgStr = msgBuffer.toString();
		try {
			var message = JSON.parse(msgStr);
			io.to(sessionID).emit(topic, message);
		} catch (e) {
			console.log(e);
		}
	});
};
