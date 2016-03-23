/**
 * Created by oguzhan on 27.02.16.
 */
(function() {

	'use strict';
	angular.module('core')
		.factory('_', lodashWrap);

	// manual dependency injection.
	lodashWrap.$inject = ['$window'];

	function lodashWrap($window) {

		return $window._;

	}
})();
