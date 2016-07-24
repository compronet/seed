'use strict';

/**
 * Module dependencies.
 */
var ping = require('net-ping');
var chalk = require('chalk');
var mongoose = require('mongoose');
var Device = mongoose.model('Device');
var session = ping.createSession();
var interval = 1000;
var mqttSrv;
var validTargets = [];
var _ = require('lodash');
var Promise = require('bluebird');
var config = require('../../config/config');

Promise.config({
	// Enables all warnings except forgotten return statements.
	warnings: {
		wForgottenReturn: false
	}
});

module.exports = function(srv, mqttClient) {
	mqttSrv = srv;
	mqttClient.on('message', function(/* topic, buffer, data */) {
		targetSync();
	});

	targetSync();
};

function targetSync() {
	Device.find().exec(function(err, devices) {
		if (err) {
			console.log(chalk.red(err.toString()));
		} else {
			devices.forEach(function(device) {
				var target = device.ip;
				var exists = validTarget(target);
				if (!exists) {
					validTargets.push(target);
					queryHost(target);
				}
			});

			validTargets.forEach(function(target) {
				var exists = (_.findIndex(devices, {
					ip: target
				}) > -1);
				if (!exists) {
					_.remove(validTargets, function(validTarget) {
						return validTarget == target;
					});
				}
			});
		}
	});
}

function validTarget(target) {

	var exists = (validTargets.indexOf(target) > -1);
	return exists;
}

function queryHost(target) {

	session.pingHost(target, function(error, target, sent, rcvd) {
		var diff;
		if (error) {
			diff = 0;
			console.log(chalk.red(target + ': ' + error.toString()));
		} else {
			diff = rcvd - sent;
		}

		var msgData = {};
		var strPayload = JSON.stringify({
			ping: {
				sent: sent,
				rcvd: rcvd,
				diff: diff,
				error: error,
				target: target
			},
			created: Date.now()
		});
		msgData.topic = config.mqtt.rootTopic + '/device/ping';
		msgData.payload = strPayload;
		msgData.qos = 0;

		mqttSrv.publish(msgData, function() {
			setTimeout(function() {
				var exists = validTarget(target);
				if (exists) {
					queryHost(target);
				}
			}, interval);
		});
	});
}
