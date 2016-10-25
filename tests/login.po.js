'use strict';

var Login = function() {
	this.userName = element(by.id('username'));
	this.userPassword = element(by.id('password'));
	this.loginBtn = element(by.id('loginButton'));
	this.loggedInUser = element(by.id('loggedInUser'));

	this.get = function() {
		browser.get('http://localhost:3000/#!/signin');
	};
};

module.exports = new Login();