(function() {
	'use strict';

	//Setting up route
	angular.module('apps').config(['$stateProvider',
		function($stateProvider) {
			// Apps state routing
			$stateProvider.
			state('apps', {
				url: '/apps',
				views: {
					'': {
						controller: 'AppsController',
						controllerAs: 'appsCtrl',
						templateUrl: 'www/modules/apps/views/list-apps.client.view.html'
					}
				}
			}).
			state('apps.view', {
				url: '/:appId',
				views: {
					'view@apps': {
						controller: 'AppViewController',
						controllerAs: 'appViewCtrl',
						templateUrl: 'www/modules/apps/views/view-app.client.view.html'
					}
				}

			}).
			state('apps.edit', {
				url: '/:appId/edit',
				views: {
					'view@apps': {
						controller: 'AppEditController',
						controllerAs: 'appEditCtrl',
						templateUrl: 'www/modules/apps/views/edit-app.client.view.html'
					}
				}

			}).
			state('apps.create', {
				url: '/create/',
				views: {
					'view@apps': {
						controller: 'AppCreateController',
						controllerAs: 'appCreateCtrl',
						templateUrl: 'www/modules/apps/views/create-app.client.view.html'
					}
				}

			});

		}
	]);
})();
