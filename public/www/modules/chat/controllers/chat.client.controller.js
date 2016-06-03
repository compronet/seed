(function() {
	'use strict';

	// Create the 'chat' controller
	angular.module('chat').controller('ChatController', ['$scope', '$window', 'Authentication', 'Socket',
		function($scope, $window, Authentication, Socket) {
			var vm = this;
			vm.messages = [];
			vm.messageText = '';
			vm.sendMessage = sendMessage;

			// Make sure the Socket is connected
			if (!Socket.socket) {
				Socket.connect();
			}

			// Add an event listener to the 'chatMessage' event
			Socket.on('chatMessage', function(message) {
				vm.messages.unshift(message);
			});

			// Create a controller method for sending messages
			function sendMessage() {
				// Create a new message object
				var message = {
					text: vm.messageText
				};

				// Emit a 'chatMessage' message event
				Socket.emit('chatMessage', message);

				// Clear the message text
				vm.messageText = '';
			}

			// Remove the event listener when the controller instance is destroyed
			$scope.$on('$destroy', function() {
				Socket.removeListener('chatMessage');
			});

			angular.element($window).bind('resize', function() {
				vm.onResize();
			});

			vm.onResize = function() {
				angular.element('.direct-chat-messages').css('min-height',
					angular.element('.main-sidebar').height() - 251);
			};

			vm.onResize();
		}
	]);
})();
