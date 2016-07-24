(function() {
	'use strict';

	// Configuring the Articles module
	angular.module('devices').run(['Menus',
		function(Menus) {
			// Set top bar menu items
			Menus.addMenuItem('sidebar', 'menu.DEVICES', 'devices', 'dropdown', '/devices/:id', false, null, 200, 'fa-hdd-o');
			Menus.addSubMenuItem('sidebar', 'devices', 'menu.DEVICESLIST', 'devices');
		}
	]);
})();
