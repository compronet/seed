(function() {
	'use strict';

	angular.module('core').controller('HeaderController', ['$scope', 'Authentication', 'Menus','$ionicSideMenuDelegate',
		function($scope, Authentication, Menus, $ionicSideMenuDelegate) {
			$scope.authentication = {};
			$scope.authentication.user = Authentication.getUser();
			
			$scope.isCollapsed = false;
			$scope.menu = Menus.getMenu('topbar');
			$scope.toggleCollapsibleMenu = function() {
				$scope.isCollapsed = !$scope.isCollapsed;
			};

			// Collapsing the menu after navigation
			$scope.$on('$stateChangeSuccess', function() {
				$scope.isCollapsed = false;
			});

			$scope.toggleLeft = function() {
				$ionicSideMenuDelegate.toggleLeft();
			};
		}
	]);
})();
