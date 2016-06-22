(function() {
	'use strict';

	// Devices controller
	angular.module('devices').controller('DevicesController', ['_', '$state', '$stateParams', '$location',
		'Authentication', 'Devices',
		function(_, $state, $stateParams, $location, Authentication, Devices) {
			var vm = this;
			vm.authentication = Authentication;
			vm.selected = {};

			vm.hideDevicesNotCreatedByAuthedUser = false;

			vm.loadAll = loadAll;
			vm.reload = reload;
			vm.select = select;
			vm.create = create;

			function loadAll() {
				vm.devices = Devices.getRestApi().query();
			}

			function reload() {
				loadAll();
				vm.selected = {};
				$state.go('devices');
			}

			function select(selectedApp) {
				$state.go('devices.view', {
					deviceId: selectedApp._id
				});
			}

			function create() {
				vm.selected = {};
				$state.go('devices.create');
			}

			Devices.onNotification(function(device) {
				if (device) {
					var deviceUpdate = _.find(vm.devices, {
						_id: device._id
					});
					if (deviceUpdate) {
						_.assign(deviceUpdate, device);
					} else {
						vm.devices.push(device);
					}

					vm.selected = device;
				} else {
					reload();
				}
			});

		}
	]);
})();
