(function() {
	'use strict';

	//Directive used to set metisMenu and minimalize button
	angular.module('core')
		.directive('sideNavigation', function($timeout, $window, Authentication, Sidebar, Menus) {
			return {
				restrict: 'E',
				templateUrl: 'modules/core/views/partials/sideNavigation.html',
				replace: true,
				scope: {
					date: '=',
					user: '='
				},
				controller:function($scope) {
					$scope.authentication = Authentication;
					$scope.isCollapsed = Sidebar.isCollapsed();

					//collapseChange();
					Sidebar.onCollapsed(function(_collapsed) {
						$scope.isCollapsed = _collapsed;
						if (!_collapsed) {
							$timeout(function() {
							angular.element('#side-menu li:not(.active) .treeview-menu').removeClass('in');
							angular.element('#side-menu li.active .treeview-menu').css('height', 'auto');
						}, 200);
						}
					});

					$scope.menu = Menus.getMenu('sidebar');

					$scope.searchMenu = {
						title: ''
					};
					$scope.$on('$stateChangeSuccess', function() {
						if (Sidebar.isCollapsed()) {
							collapseChange();
						}
					});

					function collapseChange() {
						$timeout(function() {
							angular.element('#side-menu-collapsed .treeview-menu').addClass('in');
							angular.element('#side-menu-collapsed .treeview-menu').css('height', 'auto');
						}, 200);
					}
				},

				link: function(scope, element) {
					angular.element($window).bind('resize', function() {
						scope.onResize();
					});

					scope.onResize = function() {
						angular.element('.content-wrapper, .right-side').css('min-height',
							angular.element('.main-sidebar').height() - 51);
					};

					scope.onResize();

					// Call metsi to build when user signup
					scope.$watch('authentication.user', function() {
						$timeout(function() {
							angular.element('#side-menu').metisMenu();
							angular.element('#side-menu-collapsed').metisMenu();
						});
					});

				}
			};
		})
		.directive('minimalizeSidebar', function($timeout, Sidebar) {
			return {
				restrict: 'A',
				template: '<a class="sidebar-toggle" href="" ng-click="minimalize()" data-toggle="offcanvas" ' +
					'role="button"><span class="sr-only">Toggle navigation</span></a>',
				controller: function($scope) {
					$scope.minimalize = function() {
						var targetClass = '';
						if (!angular.element('body').hasClass('body-small')) {
							targetClass = 'sidebar-collapse';

						} else {
							targetClass = 'sidebar-open';

						}

						var isCollapsed;
						angular.element('body').toggleClass(targetClass);
						if (!angular.element('body').hasClass(targetClass)) {
							isCollapsed = false;

							// Hide menu in order to smoothly turn on when maximize menu
							angular.element('#side-menu').hide();

							// For smoothly turn on menu
							$timeout(function() {
								angular.element('#side-menu').fadeIn(500);
							}, 100);
						} else {
							isCollapsed = true;

							// Remove all inline style from jquery fadeIn function to reset menu state
							angular.element('#side-menu').removeAttr('style');
						}

						Sidebar.setCollapsed(isCollapsed);
					};
				}
			};
		});
})();
