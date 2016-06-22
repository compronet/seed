(function() {
	'use strict';

	// Devices controller
	angular.module('devices').controller('DeviceViewController', ['$state', '$stateParams', 'Authentication', 'Devices', 'AppHelper',
		function($state, $stateParams, Authentication, Devices, AppHelper) {
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
					vm.authedData = AppHelper.authData(device);
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

			Devices.setPingHandler('DeviceViewController', pingHandler);
			function pingHandler(ping) {
				if (ping && vm.device) {
					if (ping.target === vm.device.ip) {
						vm.pingError = ping.error;
						updateChart(ping.diff);
					}
				}
			}

			// REALTIME
			// -----------------------------------
			vm.realTimeOptions = {
				series: {
					lines: { show: true, fill: true, fillColor:  { colors: ['#a0e0f3', '#23b7e5'] } },
					shadowSize: 0 // Drawing is faster without shadows
				},
				grid: {
					show:false,
					borderWidth: 0,
					minBorderMargin: 20,
					labelMargin: 10
				},
				xaxis: {
					tickFormatter: function() {
						return '';
					}
				},
				yaxis: {
					min: 0,
					max: 110
				},
				legend: {
					show: true
				},
				colors: ['#23b7e5']
			};

			var data = [];
			var totalPoints = 300;

			function updateChart(y) {
				if (data.length > 0) {
					data = data.slice(1);
				}

				while (data.length < totalPoints) {
					data.push(y);
				}

				// Zip the generated y values with the x values
				var res = [];
				for (var i = 0; i < data.length; ++i) {
					res.push([i, data[i]]);
				}

				vm.realTimeData = [res];
			}

		}
	]);
})();
