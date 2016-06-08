(function() {
	'use strict';
	describe('HomeController', function() {
		//Initialize global variables
		var vm;

		// Load the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		beforeEach(inject(function($controller, $rootScope) {
			vm = $controller('HomeController', {
				$scope: $rootScope.$new()
			});
		}));

		it('should expose the authentication service', function() {
			expect(vm.authentication).toBeTruthy();
		});
	});
})();
