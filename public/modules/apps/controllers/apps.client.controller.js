(function() {
	'use strict';

	// Apps controller
	angular.module('apps').controller('AppsController', ['_', '$state', '$stateParams', '$location', 'Authentication',
		'Apps',
		function(_, $state, $stateParams, $location, Authentication, Apps) {
			var vm = this;
			vm.authentication = Authentication;
			vm.selected = {};
			vm.searchText = '';

			vm.loadAll = loadAll;
			vm.reload = reload;
			vm.select = select;
			vm.create = create;

			function loadAll() {
				vm.apps = Apps.getRestApi().query();
			}

			function reload() {
				loadAll();
				vm.selected = {};
				$state.go('apps');
			}

			function select(selectedApp) {
				console.log('FIXME: apps view');
				$state.go('apps.view', {
					appId: selectedApp._id
				});
			}

			function create() {
				vm.selected = {};
				$state.go('apps.create');
			}

			Apps.onNotification(function(app) {
				if (app) {
					var appUpdate = _.find(vm.apps, {
						_id: app._id
					});
					if (appUpdate) {
						_.assign(appUpdate, app);
					} else {
						vm.apps.push(app);
					}

					vm.selected = app;
				} else {
					reload();
				}
			});

		}
	]);
})();
