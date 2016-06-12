/*
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
*/
(function () {

	angular
		.module('users')
		.service('Authentication', Authentication);

	Authentication.$inject = ['$http', '$window'];
	function Authentication ($http, $window) {

		var saveToken = function (token) {
			$window.localStorage['token'] = token;
		};

		var getToken = function () {
			return $window.localStorage['token'];
		};

		var logout = function() {
			$window.localStorage.removeItem('token');
		};

		var isLoggedIn = function() {
			var token = getToken();
			var payload;

			if(token){
				payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);

				return payload.exp > Date.now() / 1000;
			} else {
				return false;
			}
		};
		var getUser = function() {
			var user;
			if(isLoggedIn()){
				var token = getToken();
				var payload = token.split('.')[1];
				payload = $window.atob(payload);
				payload = JSON.parse(payload);
				user = {
					email : payload.email,
					username : payload.username,
					roles: payload.roles,
					displayName: payload.displayName
				};
			}
			return user;
		};
		return {
			saveToken : saveToken,
			getToken : getToken,
			logout : logout,
			isLoggedIn:isLoggedIn,
			getUser : getUser
		};
	}

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
