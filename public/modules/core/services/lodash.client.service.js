/**
 * Created by Oguzhan on 27.02.16.
 */
(function() {
	'use strict';
	angular.module('core').factory('_', ['$window', lodashWrap]);
	function lodashWrap($window) {
		return $window._;
	}
})();
