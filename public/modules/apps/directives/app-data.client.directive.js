/**
 * Created by Oguzhan on 22.01.2016.
 */
(function() {
	'use strict';
	angular.module('apps').directive('appData', ['$log', '$uibModal', 'appConstants', 'languageService',appData]);
	//appData.$inject = ['$log', '$uibModal', 'appConstants', 'languageService'];
	function appData($log, $uibModal, appConstants, languageService) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				app: '=',
				loading: '='
			},
			controller: function() {
				var vm = this;
				vm.deviceSelection = deviceSelection;
				vm.languages = languageService.getAvailable();
				vm.descLang = languageService.getSelected();

				function deviceSelection(size) {
					var modalInstance = $uibModal.open({
						animation: appConstants.animationsEnabled,
						templateUrl: 'modules/devices/views/partials/devicesModal.html',
						controller: 'DevicesModalController',
						size: size,
						resolve: {
							app: function() {
								return vm.app;
							}
						}
					});

					modalInstance.result.then(
						function(selectedDevice) {
							vm.app.device = selectedDevice;
						},

						function() {
							$log.debug('Modal dismissed at: ' + new Date());
						});
				}
			},

			controllerAs: 'appDataCtrl',
			bindToController: true,
			templateUrl: 'modules/apps/views/partials/appData.html'
		};
	}
})();
