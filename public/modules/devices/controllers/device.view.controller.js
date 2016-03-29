(function() {
	'use strict';

	// Devices controller
	angular.module('devices').controller('DeviceViewController', ['$state', '$stateParams', 'Authentication', 'Devices',
		function($state, $stateParams, Authentication, Devices) {
			var vm = this;
			vm.authentication = Authentication;
			vm.loading = {};
			vm.loading.device = true;
			vm.loading.apps = true;
			vm.apps = [];

			vm.edit = edit;
			vm.close = closeDevice;
			vm.init = init;
			vm.remove = remove;

			function edit() {
				$state.go('devices.edit', {
					deviceId: $stateParams.deviceId
				});
			}

			function closeDevice() {
				Devices.notify();
				$state.go('devices');
			}

			function init() {
				Devices.getRestApi().get({
					deviceId: $stateParams.deviceId
				}, function(device) {
					vm.device = device;
					vm.loading.device = false;
					Devices.getApps(device._id).then(function(apps) {
						vm.loading.apps = false;
						vm.apps = apps;
						Devices.notify(device);
					});

				});
			}

			function remove() {
				vm.device.$remove(function() {
					closeDevice();
				});
			}

		}
	]);
})();
