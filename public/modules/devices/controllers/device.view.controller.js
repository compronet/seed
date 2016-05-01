(function() {
	'use strict';

	// Devices controller
	angular.module('devices').controller('DeviceViewController', ['$state','$timeout', '$stateParams', 'Authentication', 'Socket', 'Devices',
		function($state, $timeout, $stateParams, Authentication, Socket, Devices) {
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

			// Add an event listener to the 'chatMessage' event
			Socket.on('device', function (data) {
				console.log(data);
				//updateChart(data);
			});


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


			var data = [], totalPoints = 300;
			function updateChart() {
				if (data.length > 0)
					data = data.slice(1);
				// Do a random walk
				while (data.length < totalPoints) {
					var prev = data.length > 0 ? data[data.length - 1] : 50,
						y = prev + Math.random() * 10 - 5;
					if (y < 0) {
						y = 0;
					} else if (y > 100) {
						y = 100;
					}
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
