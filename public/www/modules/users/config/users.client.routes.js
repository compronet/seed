(function() {
	'use strict';

	// Setting up route
	angular.module('users').config(['$stateProvider',
		function($stateProvider) {
			// Users state routing
			$stateProvider.
			state('users', {
				url: '/users',
				views: {
					'': {
						controller: 'UsersController',
						controllerAs: 'usersCtrl',
						templateUrl: 'www/modules/users/views/approve/list-users.client.view.html'
					}
				}
			}).
			state('profile', {
				url: '/settings/profile',
				templateUrl: 'www/modules/users/views/settings/edit-profile.client.view.html'
			}).
			state('password', {
				url: '/settings/password',
				templateUrl: 'www/modules/users/views/settings/change-password.client.view.html'
			}).
			state('accounts', {
				url: '/settings/accounts',
				templateUrl: 'www/modules/users/views/settings/social-accounts.client.view.html'
			}).
			state('signup', {
				url: '/signup',
				templateUrl: 'www/modules/users/views/authentication/signup.client.view.html'
			}).
			state('signin', {
				url: '/signin',
				templateUrl: 'www/modules/users/views/authentication/signin.client.view.html'
			}).
			state('forgot', {
				url: '/password/forgot',
				templateUrl: 'www/modules/users/views/password/forgot-password.client.view.html'
			}).
			state('reset-invalid', {
				url: '/password/reset/invalid',
				templateUrl: 'www/modules/users/views/password/reset-password-invalid.client.view.html'
			}).
			state('reset-success', {
				url: '/password/reset/success',
				templateUrl: 'www/modules/users/views/password/reset-password-success.client.view.html'
			}).
			state('reset', {
				url: '/password/reset/:token',
				templateUrl: 'www/modules/users/views/password/reset-password.client.view.html'
			});
		}
	]);
})();
