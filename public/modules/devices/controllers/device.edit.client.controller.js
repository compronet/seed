(function() {
	'use strict';

	// Devices controller
	angular.module('devices').controller('DeviceEditController', ['$state', '$stateParams', 'Authentication', 'Devices',
		'$q',
		function($state, $stateParams, Authentication, Devices, $q) {
			var deferred = $q.defer();
			var vm = this;
			vm.authentication = Authentication;
			vm.loading = {};
			vm.loading.device = true;
			vm.loading.apps = true;
			vm.device = {};

			vm.init = init;
			vm.cancel = cancel;
			vm.update = update;

			function init() {
				Devices.getRestApi().get({
					deviceId: $stateParams.deviceId
				}, function(device) {
					vm.loading.device = false;
					vm.device = device;
					deferred.resolve(device);
					Devices.getApps(device._id).then(function(apps) {
						vm.loading.apps = false;
						vm.device.apps = apps;
					});
				});
			}

			function cancel() {
				$state.go('devices.view', {
					deviceId: $stateParams.deviceId
				});
			}

			function update() {
				deferred.promise.then(function(device) {
					device.$update(
						function() {
							Devices.notifyUpdated(device);
							$state.go('devices.view', {
								deviceId: device._id
							});
						},

						function(errorResponse) {
							vm.error = errorResponse.data.message;
						}
					);
				});
			}
		}
	]);
})();
