(function() {
	'use strict';
	angular.module('devices').factory('Devices', ['$rootScope', '$resource', '$q', 'Socket', Devices]);
	function Devices($rootScope, $resource, $q, Socket) {

		var onPingHandlers = [];
		Socket.on(rootTopic + '/device/ping', function (message) {
			for (var key in onPingHandlers) {
				onPingHandlers[key](message.ping);
			}
		});

		var service = {
			getRestApi: getRestApi,
			notify: notify,
			setPingHandler:setPingHandler,
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

		function setPingHandler(key, handler) {
			onPingHandlers[key] = handler;
		}

		function onNotification(handler) {
			$rootScope.$on('deviceSelected', function(e, device) {
				handler(device);
			});
		}
	}
})();
