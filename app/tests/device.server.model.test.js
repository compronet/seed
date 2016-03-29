'use strict';

/**
 * Module dependencies.
 */
var should = require('should');
var mongoose = require('mongoose');
var User = mongoose.model('User');
var Device = mongoose.model('Device');

/**
 * Globals
 */
var user;
var device;

/**
 * Unit tests
 */
describe('Device Model Unit Tests:', function() {
	beforeEach(function(done) {
		user = new User({
			firstName: 'Full',
			lastName: 'Name',
			displayName: 'Full Name',
			email: 'test@test.com',
			username: 'username',
			password: 'password'
		});

		user.save(function() {
			device = new Device({
				manufacturer: 'Device Name',
				ip: '1.1.1.1',
				user: user
			});

			done();
		});
	});

	describe('Method Save', function() {
		it('should be able to save without problems', function(done) {
			return device.save(function(err) {
				should.not.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without manufacturer', function(done) {
			device.manufacturer = '';

			return device.save(function(err) {
				should.exist(err);
				done();
			});
		});

		it('should be able to show an error when try to save without ip', function(done) {
			device.ip = '';

			return device.save(function(err) {
				should.exist(err);
				done();
			});
		});
	});

	afterEach(function(done) {
		Device.remove().exec();
		User.remove().exec();

		done();
	});
});
