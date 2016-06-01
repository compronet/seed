/**
 * Created by oguzhan on 28.02.16.
 */
(function() {
	'use strict';
	angular.module('core')
	.constant('APP_MEDIAQUERY', {
		desktopLG: 1200,
		desktop: 992,
		tablet: 768,
		mobile: 480
	})
	.constant('appConstants', {
		defaultLanguageCode: 'de',
		translation: {
			filesPath: 'modules/core/i18n/',
			filesPrefix: 'locale-',
			filesSuffix: '.json',
			available: {
				0: {
					key: 'de'
				},
				1: {
					key: 'gb'
				},
				2: {
					key: 'tr'
				}
			},
			iconsPath: '/dist/img/flags/',
			iconsSuffix: '.gif'
		},
		copyright: 'compronet GmbH &copy; 2016',
		companyName: 'compronet GmbH',
		animationsEnabled: true
	});
})();
