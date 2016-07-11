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

				function pingHandler(ping) {
					var filtered = _.filter(vm.devices, { ip: ping.target });
					var filteredDevice = filtered[0];
					var filteredIndex = _.indexOf(vm.devices, filteredDevice);
					var targetDevice = vm.devices[filteredIndex];
					if (targetDevice) {

						targetDevice.error = ping.error;
						targetDevice.isReady = ping.error ? false : true;
					}

				}

				Devices.setPingHandler('devicesList', pingHandler);
			},

			controllerAs: 'devicesListCtrl',
			bindToController: true,
			templateUrl: 'modules/devices/views/partials/devicesList.html'
		};
	}
})();
