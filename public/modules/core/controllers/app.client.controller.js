/**=========================================================
 * Module: main.js
 * Main Application Controller
 =========================================================*/
(function() {
	'use strict';
	angular.module('core').controller('AppController', ['$scope', '$state', '$translate', 'appConstants',
		'Language',
		function($scope, $state, $translate, appConstants, Language) {

			// Internationalization
			// ----------------------
			$scope.copyright = appConstants.copyright;
			$scope.companyName = appConstants.companyName;

			$scope.language = {
				// Handles language dropdown
				//listIsOpen: false,

				// list of available languages
				available: appConstants.translation.available,

				// display always the current ui language
				init: function() {
					var preferredLanguage = $translate.preferredLanguage(); // we know we have set a preferred one in app.config
					$scope.language.selectedId = (preferredLanguage);
					Language.setSelected($scope.language.selectedId);
				},

				set: function(localeId) {
					$translate.use(localeId);
					$scope.language.selectedId = localeId;
					Language.setSelected($scope.language.selectedId);

				}
			};

			$scope.language.init();
			$scope.language.set($translate.preferredLanguage());

		}
	]);
})();
