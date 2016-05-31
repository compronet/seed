(function() {
	'use strict';

	// Configuring the Chat module
	angular.module('chat').run(['Menus',
		function(Menus) {
			// Set top bar menu items
			Menus.addMenuItem('topbar', 'menu.CHAT', 'chat', 'dropdown', '/chat', false, null, 200, 'fa-user');
			Menus.addSubMenuItem('topbar', 'chat', 'menu.CHAT', 'chat');
		}
	]);
})();
