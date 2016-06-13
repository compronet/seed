(function() {
	'use strict';

	// Apps controller
	angular.module('apps').controller('AppCreateModalController', ['_', '$scope', '$uibModalInstance', 'Apps',
		function(_, $scope, $uibModalInstance, Apps) {
			$scope.app = {};

			$scope.create = function() {
				var newApp = new(Apps.getRestApi())($scope.app);
				newApp.$save(
					function(response) {
						Apps.notify(response);
						$uibModalInstance.close(response);
					},

					function(err) {
						$scope.error = err.data.message;
					}
				);
			};

			$scope.cancel = function() {
				$uibModalInstance.dismiss('cancel');
			};

		}
	]);
})();
