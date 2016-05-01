'use strict';

// Create the chat configuration
module.exports = function (io, socket) {

  //TODO: listen to mqtt for device messages
  socket.on('device', function (message) {


    // Emit the 'chatMessage' event
    io.emit('device', message);
  });

};
