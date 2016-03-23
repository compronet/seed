(function() {
	'use strict';
	angular.module('apps')
		.factory('Apps', Apps);

	// manual dependency injection.
	Apps.$inject = ['$rootScope', '$resource'];

	function Apps($rootScope, $resource) {

		var service = {
			getRestApi: getRestApi,
			notify: notify,
			onNotification: onNotification
		};

		var restApi = $resource('apps/:appId', {
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
