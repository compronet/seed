'use strict';
var mongoose = require('mongoose');
// Create the chat configuration
module.exports = function (client, io, socket, sessionID) {

  client.on('connect', function () {
    client.subscribe('app/device/#');
  });

  client.on('message', function(topic,msgBuffer,data){
    var msgStr = msgBuffer.toString();
    try{
      var message = JSON.parse(msgStr);
      io.to(sessionID).emit(topic, message);
    }catch(e){
      console.log(e);
    }


  });

};
