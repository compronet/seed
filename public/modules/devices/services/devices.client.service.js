(function() {
	'use strict';

	angular.module('devices')
		.factory('Devices', Devices);

	// manual dependency injection.
	Devices.$inject = ['$rootScope', '$resource', '$q', 'Apps'];

	function Devices($rootScope, $resource, $q, Apps) {

		var service = {
			getRestApi: getRestApi,
			notify: notify,
			onNotification: onNotification,
			getApps: getApps
		};

		var restApi = $resource('devices/:deviceId', {
			deviceId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
		return service;

		function getRestApi() {
			return restApi;
		}

		function getApps(deviceId, inversed) {
			var deferred = $q.defer();
			Apps.getRestApi().query({
				deviceId: deviceId,
				inversed: inversed
			}, function(apps) {
				deferred.resolve(apps);
			});

			return deferred.promise;
		}

		function notify(device) {
			$rootScope.$emit('deviceSelected', device);
		}

		function onNotification(handler) {
			$rootScope.$on('deviceSelected', function(e, device) {
				handler(device);
			});
		}
	}
})();
