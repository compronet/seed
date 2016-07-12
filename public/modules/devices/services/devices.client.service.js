(function() {
	'use strict';
	angular.module('devices').factory('Devices', ['$rootScope', '$resource', '$q', '_', 'Socket', Devices]);
	function Devices($rootScope, $resource, $q, _, Socket) {

		var devicePingStorage = {};
		var onPingHandlers = [];
		var activeDeviceIp = null;
		var rootTopic = rootTopic || 'seedApp';

		Socket.on(rootTopic + '/device/ping', function (message) {
			devicePingStorage[message.ping.target] = {
				ping: message.ping.diff,
				isReady: message.ping.error ? false : true,
				error: message.ping.error || null
			};

			onPingHandlers.devicesList(devicePingStorage);
			if(activeDeviceIp === message.ping.target) {
				onPingHandlers.deviceView(devicePingStorage);
			}
		});

		var service = {
			getRestApi: getRestApi,
			notify: notify,
			setPingHandler: setPingHandler,
			onNotification: onNotification,
			setActiveDeviceIp: setActiveDeviceIp,
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

		function setActiveDeviceIp(ip) {
			activeDeviceIp = ip;
		}

		function onNotification(handler) {
			$rootScope.$on('deviceSelected', function(e, device) {
				handler(device);
			});
		}
	}
})();
