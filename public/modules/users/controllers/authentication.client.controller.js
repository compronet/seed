(function() {
	'use strict';

	angular.module('users').controller('AuthenticationController', ['$rootScope','$scope', '$http', '$location', 'Authentication',
		'$window', 'appConstants', '$state',
		function($rootScope,$scope, $http, $location, Authentication, $window, appConstants, $state) {
			$scope.credentials = {};
			$scope.authentication = Authentication;
			// If user is signed in then redirect back home

			if ($scope.authentication.isLoggedIn()) {
				$location.path('/');
			}

			$scope.signup = function() {
				$http.post(appConstants.restUrl+'/auth/signup', $scope.credentials).success(function(response) {

					// And redirect to the index page
					$location.path('#!/signin');
				}).error(function(response) {
					$scope.error = response.message;
				});
			};

			$scope.signin = function() {

				$http.post(appConstants.restUrl+'/auth/signin', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model

					Authentication.saveToken(response.token);
					//Authentication.set(response);
					// And redirect to the index page
					//$window.location.href = '/';

					$state.go('home');
					
				}).error(function(response) {
					$scope.error = response.message;
				});
			};
		}
	]);
})();
