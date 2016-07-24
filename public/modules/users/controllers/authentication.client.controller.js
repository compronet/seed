(function() {
	'use strict';

	angular.module('users').controller('AuthenticationController', ['$scope', '$state', '$http', '$location',
		'Authentication', '$window',
		function($scope, $state, $http, $location, Authentication, $window) {
			$scope.authentication = Authentication;

			// If user is signed in then redirect back home
			if ($scope.authentication.user) {
				$location.path('/');
			}

			$scope.signup = function() {
				$http.post('/auth/signup', $scope.credentials).success(function(/*response*/) {

					// And redirect to the index page
					$location.path('#!/signin');
				}).error(function(response) {
					$scope.error = response.message;
				});
			};

			$scope.signin = function() {
				$http.post('/auth/signin', $scope.credentials).success(function(response) {
					// If successful we assign the response to the global user model
					Authentication.user = response;

					// And redirect to the index page
					$window.location.href = '/';

					//$state.go('home');
				}).error(function(response) {
					$scope.error = response.message;
				});
			};
		}
	]);
})();
