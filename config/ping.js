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


module.exports = function(io) {
    Collection.find().exec(function (err, devices) {
        devices.forEach(function(device){
            query_host(io,device.ip);
        });
    });
};

function query_host (io,target){
    session.pingHost (target, function (error, target) {
        if (error){
            console.log (chalk.red(target + ": " + error.toString ()));
        }else{
            console.log (chalk.green(target + ": Alive"));
        }
        io.sockets.emit('device', {
            type: 'ping',
            error:error,
            created: Date.now()
        });
        setTimeout(function(){query_host(io,target);}, interval);
    });

}
