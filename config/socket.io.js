'use strict';

// Load the module dependencies
var config = require('./config');
var path = require('path');
var fs = require('fs');
var http = require('http');
var https = require('https');
var cookieParser = require('cookie-parser');
var passport = require('passport');
var socketio = require('socket.io');
var mqtt = require('mqtt');

// Define the Socket.io configuration method
module.exports = function(app, mongoStore) {
	var server;
	if (config.secure && config.secure.ssl === true) {
		// Load SSL key and certificate
		var privateKey = fs.readFileSync(path.resolve(config.secure.privateKey), 'utf8');
		var certificate = fs.readFileSync(path.resolve(config.secure.certificate), 'utf8');
		var options = {
			key: privateKey,
			cert: certificate,

			//  requestCert : true,
			//  rejectUnauthorized : true,
			secureProtocol: 'TLSv1_method',
			ciphers: [
				'ECDHE-RSA-AES128-GCM-SHA256',
				'ECDHE-ECDSA-AES128-GCM-SHA256',
				'ECDHE-RSA-AES256-GCM-SHA384',
				'ECDHE-ECDSA-AES256-GCM-SHA384',
				'DHE-RSA-AES128-GCM-SHA256',
				'ECDHE-RSA-AES128-SHA256',
				'DHE-RSA-AES128-SHA256',
				'ECDHE-RSA-AES256-SHA384',
				'DHE-RSA-AES256-SHA384',
				'ECDHE-RSA-AES256-SHA256',
				'DHE-RSA-AES256-SHA256',
				'HIGH',
				'!aNULL',
				'!eNULL',
				'!EXPORT',
				'!DES',
				'!RC4',
				'!MD5',
				'!PSK',
				'!SRP',
				'!CAMELLIA'
			].join(':'),
			honorCipherOrder: true
		};

		// Create new HTTPS Server
		server = https.createServer(options, app);
	} else {
		// Create a new HTTP server
		server = http.createServer(app);
	}

	// Create a new Socket.io server
	var io = socketio.listen(server);

	// Create a MongoDB storage object
	/*var mongoStore = new MongoStore({
		mongooseConnection: db.connection,
		collection: config.sessionCollection
	});*/

	// Intercept Socket.io's handshake request
	io.use(function(socket, next) {
		// Use the 'cookie-parser' module to parse the request cookies
		cookieParser(config.sessionSecret)(socket.request, {}, function(/*err*/) {

			// Get the session id from the request cookies
			var sessionId = socket.request.signedCookies ? socket.request.signedCookies[config.sessionKey] : undefined;

			if (!sessionId) {
				return next(new Error('sessionId was not found in socket.request'), false);
			}

			// Use the mongoStorage instance to get the Express session information
			mongoStore.get(sessionId, function(err, session) {
				if (err) {
					return next(err, false);
				}

				if (!session) {
					return next(new Error('session was not found for ' + sessionId), false);
				}

				// Set the Socket.io session information
				socket.request.session = session;

				// Use Passport to populate the user details
				passport.initialize()(socket.request, {}, function() {
					passport.session()(socket.request, {}, function() {
						if (socket.request.user) {
							next(null, true);
						} else {
							next(new Error('User is not authenticated'), false);
						}
					});
				});
			});
		});
	});

	var parseCookie = cookieParser(config.sessionSecret);

	// Add an event listener to the 'connection' event
	io.on('connection', function(socket) {
		var handshake = socket.handshake;
		if (handshake.headers.cookie) {
			parseCookie(handshake, null, function(err) {
				if (err) {
					console.log('socket.io connection: ', err.toString());
				} else {
					handshake.sessionID = handshake.signedCookies['connect.sid'];
					socket.join(handshake.sessionID);

					//TODO: extend mqtt.connect for user auth with app
					/*var mqttOptions = {
						port:1883,
						username:'appuser',
						password:'iloveapp',
						clientId: 'serverjs_'+uuid.v1(),
						clear:false
					}*/
					var mqttOptions = {
						clientId: handshake.sessionID
					};

					var client = mqtt.connect('mqtt://compronet.io', mqttOptions);
					app.set('mqtt', client);
					config.sockets.forEach(function(socketConfiguration) {
						require(path.resolve(socketConfiguration))(client, io, socket, handshake.sessionID);
					});
				}

			});
		} else {
			console.log('socket.io connection: missing handshake.cookie');
		}
	});

	return server;
};
