(function() {
	'use strict';

	angular.module('devices')
		.factory('Devices', Devices);

	// manual dependency injection.
	Devices.$inject = ['$rootScope', '$resource', '$q', 'Socket'];

	function Devices($rootScope, $resource, $q, Socket) {
		var onPingHandler;
		Socket.on(rootTopic+'/device/ping', function (message) {
			if(angular.isFunction(onPingHandler)){
				onPingHandler(message.ping);
			}
		});
		var service = {
			getRestApi: getRestApi,
			notify: notify,
			onPing: onPing,
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
			$resource('apps/device/:deviceId').query({
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

		function onPing(handler){
			onPingHandler = handler;
		}

		function onNotification(handler) {
			$rootScope.$on('deviceSelected', function(e, device) {
				handler(device);
			});
		}
	}
})();
