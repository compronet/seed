(function() {
	'use strict';

	angular.module('core').filter('translateFilter', ['$translate', function($translate) {
		function filterTranslated(item, searchVal) {
			var translated = $translate.instant(item.title);
			var firstLevel = false;
			if (translated.toLowerCase().indexOf(searchVal) !== -1) {
				firstLevel = true;
			}

			var items = item.items;
			item.inSearch = firstLevel || filterTranslatedSubitems(items, searchVal);

		}

		function filterTranslatedSubitems(items, searchVal) {
			var hits = 0;
			for (var ii = 0; ii < items.length; ii++) {

				var subTranslated = $translate.instant(items[ii].title);
				items[ii].inSearch = (subTranslated.toLowerCase().indexOf(searchVal) !== -1);
				if (items[ii].inSearch) {
					hits++;
				}
			}

			return (hits > 0);
		}

		return function(input, param) {
			var i = 0;
			if (!param) {
				for (i = 0; i < input.length; i++) {
					input[i].inSearch = true;
					for (var ii = 0; ii < input[i].items.length; ii++) {
						input[i].items[ii].inSearch = true;
					}
				}
			}else {

				for (i = 0; i < input.length; i++) {
					filterTranslated(input[i], param.toLowerCase());
				}
			}

			return input;

		};
	}]);
})();
