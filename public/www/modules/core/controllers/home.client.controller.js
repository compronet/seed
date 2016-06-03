(function() {
	'use strict';

	angular.module('core').controller('HomeController', ['Authentication',
		function(Authentication) {
			var vm = this;

			// This provides Authentication context.
			vm.authentication = Authentication;

			// Some example string
			vm.helloText = 'Welcome in AdminLTE MEAN.JS Boilerplate';
			vm.descriptionText = 'It is an application skeleton for a typical MEAN web app. You can use it to quickly' +
				' bootstrap your project.';
		}
	]);
})();
