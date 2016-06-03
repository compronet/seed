(function() {
	'use strict';

	// Devices controller
	angular.module('devices').controller('DevicesModalController', ['$scope', '$uibModalInstance', 'Devices', 'app',
		function($scope, $uibModalInstance, Devices, app) {
			$scope.devices = [];
			$scope.selected = app.device ? app.device : {};

			Devices.getRestApi().query({}, function(devices) {
				$scope.devices = devices;
			});

			$scope.select = function(selectedItem) {
				if (selectedItem._id === $scope.selected._id) {
					$scope.selected = {};
				} else {
					$scope.selected = selectedItem;
				}
			};

			$scope.ok = function() {
				$uibModalInstance.close($scope.selected);
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

		}
	]);
})();
