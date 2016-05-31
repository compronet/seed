'use strict';

var credentials = {
	username: 'username',
	password: 'password'
};

// Create a new user
var user = {
	firstName: 'Full',
	lastName: 'Name',
	displayName: 'Full Name',
	email: 'test@test.com',
	username: credentials.username,
	password: credentials.password,
	approved: true,
	provider: 'local'
};

exports.credentials = credentials;
exports.user = user;
