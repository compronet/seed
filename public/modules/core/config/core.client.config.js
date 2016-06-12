(function() {
	'use strict';

	// Configuring the Core module
	angular.module('core').run(['Menus', '$http', '$cookies',
		function($http, $cookies) {

			// Add default menu entry
			//Menus.addMenuItem('topbar', 'sidebar.nav.HOME', 'home', null, '/home', true, null, null, 'icon-home');

		}
	]).config(['$httpProvider', '$translateProvider', 'appConstants', function($httpProvider, $translateProvider, appConstants) {
		$httpProvider.defaults.useXDomain = true;
		$httpProvider.defaults.withCredentials = true;
		delete $httpProvider.defaults.headers.common["X-Requested-With"];
		$httpProvider.defaults.headers.common["Accept"] = "application/json";
		$httpProvider.defaults.headers.common["Content-Type"] = "application/json";
		
		$translateProvider.useStaticFilesLoader({
			prefix: appConstants.translation.filesPath + appConstants.translation.filesPrefix,
			suffix: appConstants.translation.filesSuffix
		});
		$translateProvider.preferredLanguage(appConstants.defaultLanguageCode);
		$translateProvider.useLocalStorage();
	}]);

})();
