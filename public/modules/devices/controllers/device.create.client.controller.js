(function() {
	'use strict';

	// Devices controller
	angular.module('devices').controller('DeviceCreateController', ['$state', 'Authentication', 'Devices',
		function($state, Authentication, Devices) {
			var vm = this;
			vm.authentication = Authentication;
			vm.device = {};
			vm.loading = {};

			vm.cancel = cancel;
			vm.create = create;

			function cancel() {
				Devices.notify();
				$state.go('devices');
			}

			function create() {
				var newDevice = new(Devices.getRestApi())(vm.device);
				newDevice.description = vm.device.description;
				newDevice.$save(function(response) {
					Devices.notify(response);
					$state.go('devices.view', {
						deviceId: response._id
					});
					clear();
				}, function(errorResponse) {
					vm.error = errorResponse.data.message;
				});
			}

			function clear() {
				vm.device.name = '';
			}

		}
	]);
})();
