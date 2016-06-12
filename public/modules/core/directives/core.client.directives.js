(function() {
	'use strict';
    
	//Directive used to set metisMenu and minimalize button
	angular.module('core')
		.directive('sideNavigation', function($timeout, $window, Authentication) {
			return {
				restrict: 'A',
				link: function(scope, element) {

					angular.element($window).bind('resize', function() {
						scope.onResize();
					});

					scope.onResize = function() {
						var minH = $window.innerHeight- (Authentication.isLoggedIn()?100:-49);
						angular.element('.content-wrapper').css('min-height', minH	);
					};

					scope.onResize();

					// Call metsi to build when user signup
					scope.$watch('authentication.user', function() {
						$timeout(function() {
							element.metisMenu();
							scope.onResize();
						},100);
					});

				}
			};
		})
		.directive('minimalizaSidebar', function($timeout) {
			return {
				restrict: 'A',
				template: '<a class="sidebar-toggle" href="" ng-click="minimalize()" data-toggle="offcanvas" ' +
					'role="button"><span class="sr-only">Toggle navigation</span></a>',
				controller: function($scope) {
					$scope.minimalize = function() {
						if (!angular.element('body').hasClass('body-small')) {
							angular.element('body').toggleClass('sidebar-collapse');
							if (!angular.element('body').hasClass('sidebar-collapse')) {
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
						} else {
							angular.element('body').toggleClass('sidebar-open');
							if (!angular.element('body').hasClass('sidebar-open')) {
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
						}
					};
				}
			};
		});
})();
