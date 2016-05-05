'use strict';

module.exports = {
	app: {
		title: 'StartApp',
		description: 'Full-Stack JavaScript with MongoDB, Express, AngularJS, and Node.js',
		keywords: 'MongoDB, Express, AngularJS, Node.js'
	},
	languages: ['de', 'gb', 'tr'],
	port: process.env.PORT || 3000,
	templateEngine: 'swig',
	sessionSecret: 'MEAN',
	sessionCollection: 'sessions',
	sessionCookie: {
		// session expiration is set by default to 24 hours
		maxAge: 24 * (60 * 60 * 1000),
		// httpOnly flag makes sure the cookie is only accessed
		// through the HTTP protocol and not JS/browser
		httpOnly: true,
		// secure cookie should be turned to true to provide additional
		// layer of security so that the cookie is set only when working
		// in HTTPS mode.
		secure: false
	},
	sessionKey: 'sessionId',
	sockets:[],
	pubsubsettings : {
		//using ascoltatore
		type: 'mongo',
		url: 'mongodb://localhost:27017/mqtt',
		pubsubCollection: 'ascoltatori',
		mongo: {}
	},
	moscaSettings : {
		port: 1883,           //mosca (mqtt) port
		backend: this.pubsubsettings   //pubsubsettings is the object we created above
	},
	mqtt:{
		topic:'seedApp'
	},
	assets: {
		lib: {
			css: [
				'public/lib/bootstrap/dist/css/bootstrap.css',
				'public/lib/metisMenu/dist/metisMenu.css',
				'public/lib/fontawesome/css/font-awesome.css',
				'public/lib/animate.css/animate.css',
				'public/lib/whirl.css/dist/whirl.css'
			],
			js: [
				'public/lib/lodash/dist/lodash.js',
				'public/lib/jquery/dist/jquery.js',
				'public/lib/bootstrap/dist/js/bootstrap.js',
				'public/lib/metisMenu/dist/metisMenu.js',
				'public/scripts.js',
				'public/lib/angular/angular.js',
				'public/lib/angular-resource/angular-resource.js',
				'public/lib/angular-cookies/angular-cookies.js',
				'public/lib/angular-translate/angular-translate.js',
				'public/lib/angular-translate-loader-url/angular-translate-loader-url.js',
				'public/lib/angular-translate-loader-static-files/angular-translate-loader-static-files.js',
				'public/lib/angular-translate-storage-local/angular-translate-storage-local.js',
				'public/lib/angular-translate-storage-cookie/angular-translate-storage-cookie.js',
				'public/lib/angular-animate/angular-animate.js',
				'public/lib/angular-touch/angular-touch.js',
				'public/lib/angular-sanitize/angular-sanitize.js',
				'public/lib/angular-ui-router/release/angular-ui-router.js',
				'public/lib/angular-ui-utils/ui-utils.js',
				'public/lib/angular-gravatar/build/angular-gravatar.js',
				'public/lib/angular-bootstrap/ui-bootstrap-tpls.js',
				'public/lib/jquery-flot/jquery.flot.js'
			]
		},
		css: [
			'public/modules/**/css/*.css'
		],
		js: [
			'public/config.js',
			'public/application.js',
			'public/modules/*/*.js',
			'public/modules/*/*[!tests]*/*.js'
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	}
};
