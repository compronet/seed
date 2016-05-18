(function() {
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module('users').factory('Users', ['$resource', '$q', Users]);
	function Users($resource, $q) {
		var service = {
			getRestApi: getRestApi,
			approve: approve
		};

		var restApi = $resource('users', {}, {
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
			$resource('users/approve').save({
				_id: id,
				approved: approved
			}, function(user) {
				deferred.resolve(user);
			});

			return deferred.promise;
		}

	}
})();
