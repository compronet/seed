'use strict';

/**
 * Module dependencies.
 */
var should = require('should');
var testUser = require('../../config/test.user');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var App = mongoose.model('App');

/**
 * Globals
 */
var user = new User(testUser.user);
var app = {};

/**
 * Unit tests
 */
describe('App Model Unit Tests:', function() {
	beforeEach(function(done) {
		user.save(function() {
			app = new App({
				name: 'App Name',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return app.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without name', function(done) {
			app.name = '';

			return app.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		App.remove().exec();
		User.remove().exec();

		done();
	});
});
