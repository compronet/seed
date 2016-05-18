(function() {
	'use strict';

	angular.module('users').controller('UsersController', ['Users', UsersController]);
	function UsersController(Users) {
		var vm = this;
		vm.searchText = '';
		vm.loadAll = loadAll;
		vm.approve = approve;

		function loadAll() {
			vm.users = Users.getRestApi().query();
		}

		function approve(user) {
			user.approved = !user.approved;
			Users.approve(user._id, user.approved);
		}
	}
})();
