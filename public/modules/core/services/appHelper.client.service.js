(function() {
	'use strict';
	angular.module('core').factory('AppHelper', ['$rootScope', '$resource', 'Authentication', AppHelper]);
	function AppHelper($rootScope, $resource, Authentication) {
		var service = {
			authData: authData
		};

		return service;

		function authData(dataSet) {
			var isAuth = false;

			if (typeof dataSet !== 'undefined' && dataSet.user) {

				isAuth = angular.equals(dataSet.user._id, Authentication.user._id);
			}

			return isAuth;
		}

	}
})();
