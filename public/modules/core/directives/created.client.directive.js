/**
 * Created by Oguzhan on 22.01.2016.
 */
(function() {
	'use strict';
	angular.module('core').directive('created', created);
	function created() {
		return {
			restrict: 'E',
			replace: true,
			scope: {
				date: '=',
				user: '='
			},
			controller: function() {},

			controllerAs: 'createdCtrl',
			bindToController: true,
			templateUrl: 'modules/core/views/partials/created.html'
		};
	}
})();
