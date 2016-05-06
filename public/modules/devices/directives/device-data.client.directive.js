/**
 * Created by Oguzhan on 22.01.2016.
 */
(function() {
	'use strict';
	angular.module('devices').directive('deviceData', ['languageService',deviceData]);
	function deviceData(languageService) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				device: '=',
				apps: '=',
				loading: '='
			},
			controller: function() {
				var vm = this;
				vm.languages = languageService.getAvailable();
				vm.descLang = languageService.getSelected();
			},

			controllerAs: 'deviceDataCtrl',
			bindToController: true,
			templateUrl: 'modules/devices/views/partials/deviceData.html'
		};
	}
})();
