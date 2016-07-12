/**
 * Created by Oguzhan on 22.01.2016.
 */
(function() {
	'use strict';
	angular.module('devices').directive('devicesList', ['_', 'Devices', devicesList]);
	function devicesList(_, Devices) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				devices: '=',
				onDeviceSelect: '&',
				selected: '=',
				searchText: '=',
				authFiltered: '='
			},
			controller: function() {
				var vm = this;
				vm.selectFn = selectFn;

				function selectFn(item) {
					if (_.isFunction(vm.onDeviceSelect())) {
						vm.onDeviceSelect()(item);
					}
				}

				vm.devices.$promise.then(function() {
					angular.forEach(vm.devices, function(device) {
						Devices.setPingHandlerList(device.ip, function(pingData) {
							device.error = pingData.error;
							device.isReady = pingData.isReady;
						});
					});
				});

			},

			controllerAs: 'devicesListCtrl',
			bindToController: true,
			templateUrl: 'modules/devices/views/partials/devicesList.html'
		};
	}
})();
