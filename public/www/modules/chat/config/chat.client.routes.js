(function() {
	'use strict';

	// Configure the 'chat' module routes
	angular.module('chat').config(['$stateProvider',
		function($stateProvider) {
			$stateProvider
				.state('chat', {
					url: '/chat',
					views: {
						'': {
							controller: 'ChatController',
							controllerAs: 'chatCtrl',
							templateUrl: 'www/modules/chat/views/chat.client.view.html'
						}
					}
				});
		}
	]);
})();
