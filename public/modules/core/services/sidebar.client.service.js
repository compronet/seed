/**
 * Created by oguzhan on 23.07.16.
 */
(function() {
	'use strict';
	angular.module('core').factory('Sidebar', [Sidebar]);
	function Sidebar() {
		var collapsed = false;
		var onCollapsedFn;
		var method = {
			setCollapsed: setCollapsed,
			isCollapsed: isCollapsed,
			onCollapsed: onCollapsed
		};
		return method;

		function setCollapsed(_collapsed) {
			collapsed = _collapsed;
			if (angular.isFunction(onCollapsedFn)) {
				onCollapsedFn(collapsed);
			}
		}

		function onCollapsed(fn) {
			onCollapsedFn = fn;
		}

		function isCollapsed() {
			return collapsed;
		}

	}
})();
