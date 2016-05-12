'use strict';

// Create the chat configuration
module.exports = function(mqttClient, io, socket/*, sessionID*/) {
	// Emit the status event when a new socket client is connected
	io.emit('chat/status', {
		text: 'Is now connected',
		created: Date.now(),
		profileImageURL: socket.request.user.profileImageURL,
		username: socket.request.user.username
	});

	// Send a chat messages to all connected sockets when a message is received
	socket.on('chat/message', function(message) {
		message.created = Date.now();
		message.profileImageURL = socket.request.user.profileImageURL;
		message.username = socket.request.user.username;

		// Emit the 'chatMessage' event
		io.emit('chat/message', message);
	});

	// Emit the status event when a socket client is disconnected
	socket.on('disconnect', function() {
		io.emit('chat/status', {
			text: 'disconnected',
			created: Date.now(),
			username: socket.request.user.username
		});
	});
};
