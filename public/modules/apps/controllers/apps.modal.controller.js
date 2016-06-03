(function() {
	'use strict';

	// Apps controller
	angular.module('apps').controller('AppsModalController', ['_', '$scope', '$uibModalInstance', 'Apps', 'apps',
		function(_, $scope, $uibModalInstance, Apps, apps) {
			$scope.apps = [];
			$scope.selected = {};

			Apps.getRestApi().query({}, function(allApps) {
				$scope.apps = _.differenceWith(allApps, apps, function(v1, v2) {
					return v1._id === v2._id;
				});
			});

			$scope.select = function(selectedItem) {
				if (selectedItem._id === $scope.selected._id) {
					$scope.selected = {};
				} else {
					$scope.selected = selectedItem;
				}
			};

			$scope.ok = function() {
				if (typeof $scope.selected._id !== 'undefined') {
					$uibModalInstance.close($scope.selected);
				} else {
					$uibModalInstance.dismiss('cancel');
				}
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

		}
	]);
})();
