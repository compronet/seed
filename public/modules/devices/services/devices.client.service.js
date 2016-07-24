(function() {
	'use strict';
	angular.module('devices').factory('Devices', ['$rootScope', '$resource', '$q', '_', 'Socket', Devices]);
	function Devices($rootScope, $resource, $q, _, Socket) {
		var pingHandlersList = [];
		var pingHandlersView = [];
		var rootTopic = rootTopic || 'seedApp';

		Socket.on(rootTopic + '/device/ping', function (message) {
			var pingData = {
				ip: message.ping.target,
				ping: message.ping.diff,
				isReady: (message.ping.error && message.ping.error !== '') ? false : true,
				error: message.ping.error || null
			};

			var targetFnList = pingHandlersList[message.ping.target];
			if (angular.isFunction(targetFnList)) {
				targetFnList(pingData);
			}

			var targetFnView = pingHandlersView[message.ping.target];
			if (angular.isFunction(targetFnView)) {
				targetFnView(pingData);
			}

		});

		var service = {
			getRestApi: getRestApi,
			notify: notify,
			notifyList: notifyList,
			setPingHandlerList: setPingHandlerList,
			setPingHandlerView: setPingHandlerView,
			onNotification: onNotification,
			onNotificationList: onNotificationList,
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

		function notifyList(devices) {
			$rootScope.$emit('devicesLoaded', devices);
		}

		function setPingHandlerList(key, handler) {
			pingHandlersList[key] = handler;
		}

		function setPingHandlerView(key, handler) {
			pingHandlersView[key] = handler;
		}

		function onNotificationList(handler) {
			$rootScope.$on('devicesLoaded', function(e, devices) {
				handler(devices);
			});
		}

		function onNotification(handler) {
			$rootScope.$on('deviceSelected', function(e, device) {
				handler(device);
			});
		}
	}
})();
