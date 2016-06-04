(function() {
	'use strict';
	angular.module('apps').factory('Apps', ['$rootScope', '$resource','appConstants', Apps]);
	function Apps($rootScope, $resource, appConstants) {
		var service = {
			getRestApi: getRestApi,
			notify: notify,
			onNotification: onNotification
		};

		var restApi = $resource(appConstants.restUrl+'/apps/:appId', {
			appId: '@_id'
		}, {
			update: {
				method: 'PUT'
			}
		});
		return service;

		function getRestApi() {
			return restApi;
		}

		function notify(app) {
			$rootScope.$emit('appSelected', app);
		}

		function onNotification(handler) {
			$rootScope.$on('appSelected', function(e, app) {
				handler(app);
			});
		}
	}
})();
