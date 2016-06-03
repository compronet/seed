(function() {
	'use strict';

	// Apps controller
	angular.module('apps').controller('AppCreateController', ['$state', 'Authentication', 'Apps',
		function($state, Authentication, Apps) {
			var vm = this;
			vm.app = {};
			vm.authentication = Authentication;

			vm.cancel = cancel;
			vm.create = create;

			function cancel() {
				Apps.notify();
				$state.go('apps');
			}

			function create() {
				if (vm.app.device) {
					vm.app.device = vm.app.device._id;
				}

				var newApp = new(Apps.getRestApi())(vm.app);
				newApp.$save(
					function(response) {
						Apps.notify(response);
						$state.go('apps.view', {
							appId: response._id
						});
						clear();
					},

					function(errorResponse) {
						vm.error = errorResponse.data.message;
					}
				);
			}

			function clear() {
				vm.app.name = '';
			}

		}
	]);
})();
