(function() {
	'use strict';

	// Configuring the Articles module
	angular.module('devices').run(['Menus',
		function(Menus) {
			// Set top bar menu items
			Menus.addMenuItem('topbar', 'menu.DEVICES', 'devices', 'dropdown', '/devices/:id', false, null, 200, 'fa-hdd-o');
			Menus.addSubMenuItem('topbar', 'devices', 'menu.DEVICESLIST', 'devices');
			//Menus.addSubMenuItem('topbar', 'devices', 'New Device', 'devices/create');
		}
	]);
})();
