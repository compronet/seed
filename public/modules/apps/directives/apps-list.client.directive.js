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
				editAppFn: '&?',
				onAppDelete: '&?',
				editable: '=',
				selected: '=',
				searchText: '=',
				showDelete:'=',
				showReorder:'='
			},
			controller: function() {
				var vm = this;
				vm.selectFn = selectFn;
				vm.appSelectionFn = appSelection;
				vm.appCreateInline = appCreateInline;
				vm.moveItem = moveItem;

				vm.onItemDelete = function(item) {
					vm.apps.splice(vm.apps.indexOf(item), 1);
					if(angular.isFunction(vm.onAppDelete())){
						vm.onAppDelete()(item);	
					}
					
				};

				function moveItem (item, fromIndex, toIndex) {
					vm.apps.splice(fromIndex, 1);
					vm.apps.splice(toIndex, 0, item);
				}
				
				function selectFn(item) {
					if (_.isFunction(vm.onAppSelect())) {
						vm.onAppSelect()(item);
					}
				}

				function edit(item){
					vm.editAppFn()(item);
				}

				function appCreateInline() {
					var modalInstance = $uibModal.open({
						animation: appConstants.animationsEnabled,
						templateUrl: 'modules/apps/views/partials/appCreateModal.html',
						controller: 'AppCreateModalController'
					});
					modalInstance.result.then(function(app) {
						vm.apps.push(app);
					});

				}

				function appSelection() {
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
