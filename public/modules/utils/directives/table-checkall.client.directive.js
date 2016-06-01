/**=========================================================
 * Module: table-checkall.js
 * Tables check all checkbox
 =========================================================*/
(function() {
	'use strict';

	angular
		.module('utils')
		.directive('checkAll', checkAll);

	function checkAll() {
		var directive = {
			link: link,
			restrict: 'A'
		};
		return directive;

		function link(scope, element) {
			element.on('change', function() {
				var $this = $(this);
				var index = $this.index() + 1;
				var checkbox = $this.find('input[type="checkbox"]');
				var table = $this.parents('table');

				// Make sure to affect only the correct checkbox column
				table.find('tbody > tr > td:nth-child(' + index + ') input[type="checkbox"]')
					.prop('checked', checkbox[0].checked);

			});
		}
	}

})();
