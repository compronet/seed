(function() {
	'use strict';

	// Configuring the Articles module
	angular.module('apps').run(['Menus',
		function(Menus) {
			// Set top bar menu items
			Menus.addMenuItem('topbar', 'menu.APPS', 'apps', 'dropdown', '/apps/:id', false, null, 200, 'fa-cubes');
			Menus.addSubMenuItem('topbar', 'apps', 'menu.APPSLIST', 'apps');
			//Menus.addSubMenuItem('topbar', 'apps', 'New App', 'apps/create');
		}
	]);
})();
