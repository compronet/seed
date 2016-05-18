(function() {
	'use strict';

	// Config HTTP Error Handling
	angular.module('users').config(['$httpProvider',
		function($httpProvider) {
			// Set the httpProvider "not authorized" interceptor
			$httpProvider.interceptors.push(['$q', '$location', 'Authentication',
				function($q, $location, Authentication) {
					return {
						responseError: function(rejection) {
							switch (rejection.status) {
								case 401:

									// Deauthenticate the global user
									Authentication.user = null;

									// Redirect to signin page
									$location.path('signin');
									break;
								case 403:

									// Add unauthorized behaviour
									break;
							}

							return $q.reject(rejection);
						}
					};
				}
			]);
		}
	]).run(['Menus',
		function(Menus) {
			// Set top bar menu items
			Menus.addMenuItem('topbar', 'menu.USERS', 'users', 'dropdown', '/users/:id', false, null, 200, 'fa-users');
			Menus.addSubMenuItem('topbar', 'users', 'menu.USERSLIST', 'users');
		}
	]);
})();
