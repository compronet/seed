/**
 * Created by Oguzhan on 22.01.2016.
 */
(function() {
	'use strict';
	angular.module('apps').directive('appsList', ['_', '$uibModal', 'appConstants', appsList]);

	function appsList(_, $uibModal, appConstants) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				apps: '=',
				onAppSelect: '&',
				removeAppFn: '&',
				editable: '=',
				selected: '=',
				searchText: '='
			},
			controller: function() {
				var vm = this;
				vm.selectFn = selectFn;
				vm.removeAppFn = removeApp;
				vm.appSelectionFn = appSelection;

				function selectFn(item) {
					if (_.isFunction(vm.onAppSelect())) {
						vm.onAppSelect()(item);
					}
				}

				function removeApp(app) {
					_.pull(vm.apps, app);
				}

				function appSelection() {
					//TODO: add "create new app" here in addition to setting the device relation of an existing one
					var modalInstance = $uibModal.open({
						animation: appConstants.animationsEnabled,
						templateUrl: 'modules/apps/views/partials/appsModal.html',
						controller: 'AppsModalController',
						resolve: {
							apps: function() {
								return vm.apps;
							}
						}
					});

					modalInstance.result.then(function(app) {
						vm.apps.push(app);
					});
				}
			},

			controllerAs: 'appsListCtrl',
			bindToController: true,
			templateUrl: 'modules/apps/views/partials/appsList.html'
		};
	}
})();
