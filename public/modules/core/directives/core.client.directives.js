(function() {
	'use strict';

	//Directive used to set metisMenu and minimalize button
	angular.module('core')
		.directive('sideNavigation', function($timeout) {
			return {
				restrict: 'A',
				link: function(scope, element) {
					// Call metsi to build when user signup
					scope.$watch('authentication.user', function() {
						$timeout(function() {
							element.metisMenu();
						});
					});

				}
			};
		})
		.directive('minimalizaSidebar', function($timeout) {
			return {
				restrict: 'A',
				template: '<a class="sidebar-toggle" href="" ng-click="minimalize()" data-toggle="offcanvas" role="button"><span class="sr-only">Toggle navigation</span></a>',
				controller: function($scope) {
					$scope.minimalize = function() {
						angular.element('body').toggleClass('sidebar-collapse');
						if (!angular.element('body').hasClass('sidebar-collapse') || angular.element('body').hasClass('body-small')) {
							// Hide menu in order to smoothly turn on when maximize menu
							angular.element('#side-menu').hide();
							// For smoothly turn on menu
							$timeout(function() {
								angular.element('#side-menu').fadeIn(500);
							}, 100);
						} else {
							// Remove all inline style from jquery fadeIn function to reset menu state
							angular.element('#side-menu').removeAttr('style');
						}
					};
				}
			};
		});
})();
