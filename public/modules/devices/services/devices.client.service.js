(function() {
	'use strict';
	angular.module('devices').factory('Devices', ['$rootScope', '$resource', '$q', '_', 'Socket', Devices]);
	function Devices($rootScope, $resource, $q, _, Socket) {
		var onPingHandlers = [];
		var rootTopic = rootTopic || 'seedApp';

		Socket.on(rootTopic + '/device/ping', function (message) {
			var pingData = {
				ip: message.ping.target,
				ping: message.ping.diff,
				isReady: message.ping.error ? false : true,
				error: message.ping.error || null
			};
			var targetFn = onPingHandlers[message.ping.target];
			if (angular.isFunction(targetFn)) {
				targetFn(pingData);
			}

		});

		var service = {
			getRestApi: getRestApi,
			notify: notify,
			setPingHandler: setPingHandler,
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
