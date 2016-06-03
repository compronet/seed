(function() {
	'use strict';

	// Setting up route
	angular.module('core').config(['$stateProvider', '$urlRouterProvider',
		function($stateProvider, $urlRouterProvider) {
			// Redirect to home view when route not found
			$urlRouterProvider.otherwise('/signin');

			// Home state routing
			$stateProvider.
			state('home', {
				url: '/',
				controllerAs: 'homeCtrl',
				controller: 'HomeController',
				templateUrl: 'modules/core/views/home.client.view.html'
			});
		}
	]);
})();
