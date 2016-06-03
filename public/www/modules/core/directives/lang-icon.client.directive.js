/**
 * Created by Oguzhan on 22.01.2016.
 */
(function() {
	'use strict';
	angular.module('core').directive('langIcon', ['appConstants', langIcon]);
	function langIcon(appConstants) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				key: '='
			},
			controller: function() {
				var vm = this;
				vm.iconsPath = appConstants.translation.iconsPath;
				vm.iconsSuffix = appConstants.translation.iconsSuffix;
			},

			controllerAs: 'langIconCtrl',
			bindToController: true,
			templateUrl: 'www/modules/core/views/partials/langIcon.html'
		};
	}
})();
