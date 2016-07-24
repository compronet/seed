(function() {
	'use strict';

	// Configuring the Articles module
	angular.module('apps').run(['Menus',
		function(Menus) {
			// Set top bar menu items
			Menus.addMenuItem('sidebar', 'menu.APPS', 'apps', 'dropdown', '/apps/:id', false, null, 200, 'fa-cubes');
			Menus.addSubMenuItem('sidebar', 'apps', 'menu.APPSLIST', 'apps');
		}
	]);
})();
