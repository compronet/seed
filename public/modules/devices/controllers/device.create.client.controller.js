(function() {
	'use strict';

	// Devices controller
	angular.module('devices').controller('DeviceCreateController', ['$state', 'Authentication', 'Devices',
		function($state, Authentication, Devices) {
			var vm = this;
			vm.authentication = Authentication;
			vm.device = {
				apps: []
			};
			vm.loading = {};

			vm.cancel = cancel;
			vm.create = create;

			function cancel() {
				$state.go('devices');
			}

			function create() {
				var newDevice = new(Devices.getRestApi())(vm.device);
				newDevice.description = vm.device.description;
				newDevice.$save(
					function(device) {
						Devices.notifyUpdated(device);
						$state.go('devices.view', {
							deviceId: device._id
						});
						clear();
					},

					function(errorResponse) {
						vm.error = errorResponse.data.message;
					}
				);
			}

			function clear() {
				vm.device.name = '';
			}

		}
	]);
})();
