(function() {
	'use strict';
	angular.module('core').filter('auth', ['AppHelper', function(AppHelper) {
		/**
		 * Returns new array of valid authed data
		 * @param  {array} input              Input array
		 * @param  {boolean} shouldAuth       Does the data need to be authed?
		 * @return {array}                    Valid authed data
		 */
		return function(input, shouldAuth) {

			if (!shouldAuth) {
				return input;
			}

			return input.filter(function(item) {
				return AppHelper.authData(item);
			});
		};
	}]);
})();
