(function() {
	'use strict';

	// Apps controller
	angular.module('apps').controller('AppViewController', ['$state', '$stateParams', 'Authentication', 'Apps',
		function($state, $stateParams, Authentication, Apps) {
			var vm = this;
			vm.authentication = Authentication;
			vm.loading = true;

			vm.edit = edit;
			vm.close = closeApp;
			vm.init = init;
			vm.remove = remove;

			function edit() {
				$state.go('apps.edit', {
					appId: $stateParams.appId
				});
			}

			function closeApp() {
				Apps.notify();
				$state.go('apps');
			}

			function init() {
				Apps.getRestApi().get({
					appId: $stateParams.appId
				}, function(app) {
					vm.app = app;
					vm.loading = false;
					Apps.notify(app);
				});
			}

			function remove() {
				vm.app.$remove(function() {
					closeApp();
				});
			}

		}
	]);
})();
