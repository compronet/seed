'use strict';

/**
 * Module dependencies.
 */
var fs = require('fs');
var https = require('https');
var express = require('express');
var morgan = require('morgan');
var bodyParser = require('body-parser');
var session = require('express-session');
var compress = require('compression');
var methodOverride = require('method-override');
var cookieParser = require('cookie-parser');
var helmet = require('helmet');
var passport = require('passport');
var MongoStore = require('connect-mongo')(session);
var flash = require('connect-flash');
var config = require('./config');
var consolidate = require('consolidate');
var path = require('path');

module.exports = function(db, mqttClient) {
	// Initialize express app
	var app = express();
	var mongoStore = new MongoStore({
		mongooseConnection: db.connection,
		collection: config.sessionCollection
	});

	// Globbing model files
	config.getGlobbedFiles('./app/models/**/*.js').forEach(function(modelPath) {
		require(path.resolve(modelPath));
	});

	// Setting application local variables
	app.locals.title = config.app.title;
	app.locals.description = config.app.description;
	app.locals.keywords = config.app.keywords;
	app.locals.facebookAppId = config.facebook.clientID;
	app.locals.jsFiles = config.getJavaScriptAssets();
	app.locals.cssFiles = config.getCSSAssets();

	// Passing the request url to environment locals
	app.use(function(req, res, next) {
		res.locals.url = req.protocol + '://' + req.headers.host + req.url;
		next();
	});

	// Should be placed before express.static
	app.use(compress({
		filter: function(req, res) {
			return (/json|text|javascript|css/).test(res.getHeader('Content-Type'));
		},

		level: 9
	}));

	// Showing stack errors
	app.set('showStackError', true);

	// Set swig as the template engine
	app.engine('server.view.html', consolidate[config.templateEngine]);

	// Set views path and view engine
	app.set('view engine', 'server.view.html');
	app.set('views', './app/views');

	// Environment dependent middleware
	if (process.env.NODE_ENV === 'development') {
		// Enable logger (morgan)
		app.use(morgan('dev'));

		// Disable views cache
		app.set('view cache', false);
	} else if (process.env.NODE_ENV === 'production') {
		app.locals.cache = 'memory';
	}

	// Request body parsing middleware should be above methodOverride
	app.use(bodyParser.urlencoded({
		extended: true
	}));
	app.use(bodyParser.json());
	app.use(methodOverride());

	// CookieParser should be above session
	app.use(cookieParser());

	// Express MongoDB session storage
	app.use(session({
		saveUninitialized: true,
		resave: true,
		secret: config.sessionSecret,
		cookie: {
			maxAge: config.sessionCookie.maxAge,
			httpOnly: config.sessionCookie.httpOnly,
			secure: config.sessionCookie.secure && config.secure.ssl
		},
		key: config.sessionKey,
		store: mongoStore
	}));

	// use passport session
	app.use(passport.initialize());
	app.use(passport.session());

	// connect flash for flash messages
	app.use(flash());

	// Use helmet to secure Express headers
	app.use(helmet.frameguard());
	app.use(helmet.xssFilter());
	app.use(helmet.noSniff());
	app.use(helmet.ieNoOpen());
	app.disable('x-powered-by');

	// Setting the app router and static folder
	app.use(express.static(path.resolve('./public')));

	// Globbing routing files
	config.getGlobbedFiles('./app/routes/**/*.js').forEach(function(routePath) {
		require(path.resolve(routePath))(app);
	});

	// Globbing socket files
	config.sockets = config.getGlobbedPaths('./app/sockets/**/*.js');

	// Assume 'not found' in the error msgs is a 404. this is somewhat silly, but valid, you can do whatever you like,
	// set properties, use instanceof etc.
	app.use(function(err, req, res, next) {
		// If the error object doesn't exists
		if (!err) {
			return next();
		}

		// Log it
		console.error(err.stack);

		// Error page
		res.status(500).render('500', {
			error: err.stack
		});
	});

	// Assume 404 since no middleware responded
	app.use(function(req, res) {
		res.status(404).render('404', {
			url: req.originalUrl,
			error: 'Not Found'
		});
	});

	if (process.env.NODE_ENV === 'secure') {
		// Log SSL usage
		console.log('Securely using https protocol');

		// Load SSL key and certificate
		var privateKey = fs.readFileSync('./config/sslcerts/key.pem', 'utf8');
		var certificate = fs.readFileSync('./config/sslcerts/cert.pem', 'utf8');

		// Create HTTPS Server
		var httpsServer = https.createServer({
			key: privateKey,
			cert: certificate
		}, app);

		// Return HTTPS server instance
		return httpsServer;
	}

	if (mqttClient) {
		app.set('mqttClient', mqttClient);
	}

	// Configure Socket.io
	// Load the Socket.io configuration and return server object
	// NOTE Socket.io function is not needed for testing
	if (process.env.NODE_ENV !== 'test') {
		return require('./socket.io')(app, mqttClient, mongoStore);
	}

	// Return Express server instance
	return app;
};

