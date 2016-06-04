/**
 * Created by oguzhan on 28.02.16.
 */
(function() {
	'use strict';
	angular.module('core').constant('appConstants', {
		restUrl: 'http://192.168.178.5:'+(window.restPort?window.restPort:'3030'),
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
				},
				3: {
					key: 'hu'
				},
				4: {
					key: 'pt'
				}
			},
			iconsPath: '/img/flags/',
			iconsSuffix: '.gif'
		},
		copyright: 'compronet GmbH &copy; 2016',
		companyName: 'compronet GmbH',
		animationsEnabled: true
	});
})();
