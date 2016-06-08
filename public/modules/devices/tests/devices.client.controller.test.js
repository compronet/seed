(function() {
	'use strict';

	// Devices Controller Spec
	describe('Devices Controller Tests', function() {
		// Initialize global variables
		var vm;
		var $httpBackend;
		var $stateParams;
		var $location;

		// The $resource service augments the response object with methods for updating and deleting the resource.
		// If we were to use the standard toEqual matcher, our tests would fail because the test values would not match
		// the responses exactly. To solve the problem, we define a new toEqualData Jasmine matcher.
		// When the toEqualData matcher compares two objects, it takes only object properties into
		// account and ignores methods.
		beforeEach(function() {
			jasmine.addMatchers({
				toEqualData: function() {
					return {
						compare: function(actual, expected) {
							return {
								pass: angular.equals(actual, expected)
							};
						}
					};
				}
			});
		});

		// Then we can start by loading the main application module
		beforeEach(module(ApplicationConfiguration.applicationModuleName));

		// The injector ignores leading and trailing underscores here (i.e. _$httpBackend_).
		// This allows us to inject a service but then attach it to a variable
		// with the same name as the service.
		beforeEach(inject(function($controller, $rootScope, _$location_, _$stateParams_, _$httpBackend_) {
			// Point global variables to injected services
			$stateParams = _$stateParams_;
			$httpBackend = _$httpBackend_;
			$location = _$location_;

			// Initialize the Devices controller.
			vm = $controller('DevicesController', {
				$scope: $rootScope.$new()
			});
			$httpBackend.expectGET('modules/core/i18n/locale-de.json').respond({});
		}));

		it('vm.loadAll() should create an array with at least one Device object fetched from XHR', inject(function(Devices) {
			// Create sample Device using the Devices service
			var sampleDevice = new(Devices.getRestApi())({
				name: 'New Device'
			});

			// Create a sample Devices array that includes the new Device
			var sampleDevices = [sampleDevice];

			// Set GET response
			$httpBackend.expectGET('devices').respond(sampleDevices);
			$httpBackend.expectGET('modules/core/views/home.client.view.html').respond({});

			// Run controller functionality
			vm.loadAll();
			$httpBackend.flush();

			// Test vm value
			expect(vm.devices).toEqualData(sampleDevices);
		}));
	});
}());
