(function() {
	'use strict';

	angular.module('core').filter('translateFilter', ['$translate', function($translate) {
		return function(input, param) {

			if (!param) {
				return input;
			}

			var result = [];
			var searchVal = param.toLowerCase();

			var translateFunction = function(translated) {
				if (translated.toLowerCase().indexOf(searchVal) !== -1) {
					result.push(input[i]);
				}
			};

			for (var i = 0; i < input.length; i++) {
				translateFunction($translate.instant(input[i].title));
			}

			return result;
		};
	}]);
})();
