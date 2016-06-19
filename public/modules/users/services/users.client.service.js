(function() {
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module('users').factory('Users', ['$resource', '$q','appConstants', Users]);
	function Users($resource, $q, appConstants) {
		var service = {
			getRestApi: getRestApi,
			approve: approve
		};

		var restApi = $resource(appConstants.restUrl+'/users', {}, {
			update: {
				method: 'PUT'
			}
		});
		return service;

		function getRestApi() {
			return restApi;
		}

		function approve(id, approved) {
			var deferred = $q.defer();
			$resource(appConstants.restUrl+'/users/approve').save({
				_id: id,
				approved: approved
			}, function(user) {
				deferred.resolve(user);
			});

			return deferred.promise;
		}

	}
})();
