(function() {
	'use strict';

	// Configuring the Core module
	angular.module('core').run(['Menus',
		function() {

			// Add default menu entry
			//Menus.addMenuItem('topbar', 'sidebar.nav.HOME', 'home', null, '/home', true, null, null, 'icon-home');

		}
	]).config(['$translateProvider', 'appConstants', function($translateProvider, appConstants) {

		$translateProvider.useStaticFilesLoader({
			prefix: appConstants.translation.filesPath + appConstants.translation.filesPrefix,
			suffix: appConstants.translation.filesSuffix
		});
		$translateProvider.preferredLanguage(appConstants.defaultLanguageCode);
		$translateProvider.useLocalStorage();
	}]);
})();
