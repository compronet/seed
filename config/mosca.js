'use strict';

var config = require('./config');
var mosca = require('mosca');

module.exports = function() {
	var mqttSrv = new mosca.Server(config.moscaSettings); //here we start mosca

	mqttSrv.on('ready', function() {
		console.log('Mosca server is up and running');
	}); //on init it fires up setup()

	mqttSrv.on('clientConnected', function(/*client*/) {
		//console.log('client connected', client.id);
	});

	// fired when a message is received
	/*mqttSrv.on('published', function(packet, client) {
	    console.log('Published', packet);
	});*/

	return mqttSrv;
};
