(function() {
	'use strict';

	// Authentication service for user variables
	angular.module('users').factory('Authentication', ['$rootScope',
		function($rootScope) {
			var _this = this;

			_this._data = {
				user: (window.user?window.user:$rootScope.user)
			};
			
			return _this._data;
		}
	]);
})();

/*
(function() {
	'use strict';

	// Users service used for communicating with the users REST endpoint
	angular.module('users').factory('Authentication', [Authentication]);
	function Authentication() {
		var service = {
			set: set,
			get: get
		};
		var _this={};
		return service;
		function set(_user){

			var user = window.user? window.user: _user;
			_this.user = user;
		}
		function get(){
			
			return _this;
		}

	}
})();
*/
