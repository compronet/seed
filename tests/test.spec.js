'use strict';

describe('Login page', function() {
	var loginPage = require('./login.po');
	var ticketId = '';

	beforeEach(function() {
		loginPage.get();
		loginPage.userName.sendKeys('admin');
		loginPage.userPassword.sendKeys('laco1221');
		loginPage.loginBtn.click();
	});

	it('should login successfully', function() {
		browser.driver.wait(loginPage.loggedInUser.isPresent()).then(function(){
			expect(loginPage.loggedInUser.getText()).toEqual('laco papa');
		});
	});

	afterEach(function(){
		browser.get('http://localhost:3000/auth/signout');
	});
});