(function() {
	'use strict';
	// Apps controller
	angular.module('apps').controller('AppEditController', ['$state', '$stateParams', 'Authentication', 'Apps', '$q',
		function($state, $stateParams, Authentication, Apps, $q) {
			var deferred = $q.defer();
			var vm = this;
			vm.authentication = Authentication;
			vm.app = {};
			vm.loading = true;

			vm.init = init;
			vm.cancel = cancel;
			vm.update = update;

			function init() {
				Apps.getRestApi().get({
					appId: $stateParams.appId
				}, function(app) {
					vm.app = app;
					vm.loading = false;
					Apps.notify(app);
					deferred.resolve(app);
				});
			}

			function cancel() {
				$state.go('apps.view', {
					appId: $stateParams.appId
				});
			}

			function update() {

				deferred.promise.then(function(app) {
					if (app.device && app.device._id) {
						app.device = vm.app.device._id;
					} else {
						app.device = null;
					}
					app.$update(function() {
						$state.go('apps.view', {
							appId: app._id
						});
					}, function(errorResponse) {
						vm.error = errorResponse.data.message;
					});
				});
			}
		}
	]);
})();
