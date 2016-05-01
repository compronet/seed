'use strict';
/**
 * Module dependencies.
 */
require('./config/init')();
var config = require('./config/config');
var mongoose = require('mongoose');
var path = require('path');
var socketio = require('socket.io');
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

// Init the express application
var app = require('./config/express')(db);
// Globbing model files
config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
    require(path.resolve(modelPath));
});

require('./config/ping')(socketio());

console.log('MQTT application started');
