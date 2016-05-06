/**
 * Created by Oguzhan on 22.01.2016.
 */
(function() {
	'use strict';
	angular.module('devices').directive('devicesList', devicesList);
	devicesList.$inject = ['_'];

	function devicesList(_) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				devices: '=',
				onDeviceSelect: '&',
				selected: '='
			},
			controller: function() {
				var vm = this;
				vm.selectFn = selectFn;
				//TODO: implement status check for ping in list view directive
				function selectFn(item) {
					if (_.isFunction(vm.onDeviceSelect())) {
						vm.onDeviceSelect()(item);
					}
				}
			},

			controllerAs: 'devicesListCtrl',
			bindToController: true,
			templateUrl: 'modules/devices/views/partials/devicesList.html'
		};
	}
})();
