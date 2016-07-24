'use strict';

module.exports = {
	db: 'mongodb://localhost/startapp',
	port: process.env.PORT || 3030,
	assets: {
		lib: {
			css: ['public/www/vendor.min.css'],
			js: ['public/www/vendor.min.js']
		},
		img: ['public/www/img/*.png'],
		css: ['public/www/app.min.css'],
		js: [
			'public/www/js/app.min.js',
		],
		tests: [
			'public/lib/angular-mocks/angular-mocks.js',
			'public/modules/*/tests/*.js'
		]
	},
	pubsubsettings: {
		//using ascoltatore
		type: 'mongo',
		url: 'mongodb://localhost:27017/mqtt',
		pubsubCollection: 'ascoltatori',
		mongo: {}
	},
	mqtt:{
		rootTopic:'seedApp',
		url:'localhost'
	},
	facebook: {
		clientID: process.env.FACEBOOK_ID || 'APP_ID',
		clientSecret: process.env.FACEBOOK_SECRET || 'APP_SECRET',
		callbackURL: '/auth/facebook/callback'
	},
	twitter: {
		clientID: process.env.TWITTER_KEY || 'CONSUMER_KEY',
		clientSecret: process.env.TWITTER_SECRET || 'CONSUMER_SECRET',
		callbackURL: '/auth/twitter/callback'
	},
	google: {
		clientID: process.env.GOOGLE_ID || 'APP_ID',
		clientSecret: process.env.GOOGLE_SECRET || 'APP_SECRET',
		callbackURL: '/auth/google/callback'
	},
	linkedin: {
		clientID: process.env.LINKEDIN_ID || 'APP_ID',
		clientSecret: process.env.LINKEDIN_SECRET || 'APP_SECRET',
		callbackURL: '/auth/linkedin/callback'
	},
	github: {
		clientID: process.env.GITHUB_ID || 'APP_ID',
		clientSecret: process.env.GITHUB_SECRET || 'APP_SECRET',
		callbackURL: '/auth/github/callback'
	},
	mailer: {
		from: process.env.MAILER_FROM || 'MAILER_FROM',
		options: {
			host: process.env.MAILER_SERVICE_HOST || 'MAILER_SERVICE_HOST',
			port: process.env.MAILER_SERVICE_PORT || 465,
			auth: {
				user: process.env.MAILER_EMAIL_ID || 'MAILER_EMAIL_ID',
				pass: process.env.MAILER_PASSWORD || 'MAILER_PASSWORD'
			}
		}
	}
};
