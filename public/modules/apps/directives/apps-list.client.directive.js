/**
 * Created by Oguzhan on 22.01.2016.
 */
(function() {
	'use strict';
	angular.module('apps').directive('appsList',['_',appsList]);
	function appsList(_) {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				apps: '=',
				onAppSelect: '&',
				selected: '='
			},
			controller: function() {
				var vm = this;
				vm.selectFn = selectFn;

				function selectFn(item) {
					if (_.isFunction(vm.onAppSelect())) {
						vm.onAppSelect()(item);
					}
				}
			},

			controllerAs: 'appsListCtrl',
			bindToController: true,
			templateUrl: 'modules/apps/views/partials/appsList.html'
		};
	}
})();
