/**
 * Created by Oguzhan on 22.01.2016.
 */
(function() {
	'use strict';
	angular.module('devices').directive('deviceData', ['Language', deviceData]);
	function deviceData(Language) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				device: '=',
				loading: '='
			},
			controller: function() {
				var vm = this;
				vm.languages = Language.getAvailable();
				vm.descLang = Language.getSelected();
			},

			controllerAs: 'deviceDataCtrl',
			bindToController: true,
			templateUrl: 'modules/devices/views/partials/deviceData.html'
		};
	}
})();
