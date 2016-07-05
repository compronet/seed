(function() {
	'use strict';

	angular.module('core').filter('translateFilter', ['$translate', function($translate) {
		return function(input, param) {
			console.log('called');
			if (!param) {
				return input;
			}

			var result = [];
			var searchVal = param.toLowerCase();

			var translateFunction = function(translated) {
				if (translated.toLowerCase().indexOf(searchVal) !== -1) {
					console.log('push', translated, searchVal);
					result.push(input[i]);
				}
			};

			for (var i = 0; i < input.length; i++) {
				$translate(input[i].title).then(translateFunction);
			}

			return result;
		};
	}]);
})();
