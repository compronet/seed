/**
 * Created by oguzhan on 28.02.16.
 */
(function() {
	'use strict';
	angular.module('core')
		.factory('languageService', languageService);

	// manual dependency injection.
	languageService.$inject = ['appConstants'];

	function languageService(appConstants) {
		var selected = '';
		var method = {
			setSelected: setSelected,
			getSelected: getSelected,
			getAvailable: getAvailable
		};
		return method;

		function setSelected(key) {
			selected = key;
		}

		function getSelected() {
			return selected;
		}

		function getAvailable() {
			return appConstants.translation.available;
		}

	}

})();
