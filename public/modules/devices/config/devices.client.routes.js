(function() {
	'use strict';

	//Setting up route
	angular.module('devices').config(['$stateProvider',
		function($stateProvider) {
			// Devices state routing
			$stateProvider.
			state('devices', {
				url: '/devices',
				views: {
					'': {
						controller: 'DevicesController',
						controllerAs: 'devicesCtrl',
						templateUrl: 'modules/devices/views/list-devices.client.view.html'
					}
				}
			}).
			state('devices.view', {
				url: '/:deviceId',
				views: {
					'view@devices': {
						controller: 'DeviceViewController',
						controllerAs: 'deviceViewCtrl',
						templateUrl: 'modules/devices/views/view-device.client.view.html'
					}
				}

			}).
			state('devices.edit', {
				url: '/:deviceId/edit',
				views: {
					'view@devices': {
						controller: 'DeviceEditController',
						controllerAs: 'deviceEditCtrl',
						templateUrl: 'modules/devices/views/edit-device.client.view.html'
					}
				}

			}).
			state('devices.create', {
				url: '/create/',
				views: {
					'view@devices': {
						controller: 'DeviceCreateController',
						controllerAs: 'deviceCreateCtrl',
						templateUrl: 'modules/devices/views/create-device.client.view.html'
					}
				}

			});

		}
	]);
})();
