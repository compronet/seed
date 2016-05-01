'use strict';

/**
 * Module dependencies.
 */
var ping = require ("net-ping");
var chalk = require('chalk');
var mongoose = require('mongoose');
var Collection = mongoose.model('Device');
var session = ping.createSession ();
var interval = 1000;


module.exports = function() {
    Collection.find().exec(function (err, devices) {
        devices.forEach(function(device){
            query_host(device.ip);
        });
    });
};

function query_host (target){
    session.pingHost (target, function (error, target) {
        if (error){
            console.log (chalk.red(target + ": " + error.toString ()));
        }else{
            console.log (chalk.green(target + ": Alive"));
        }
        //TODO: send mqtt
        setTimeout(function(){query_host(target);}, interval);
    });

}
