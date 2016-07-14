'use strict';

module.exports = function(mqttClient, io, socket, sessionID) {
    mqttClient.on('message', function(topic, msgBuffer) {
        var msgStr = msgBuffer.toString();
        try {
            var message = JSON.parse(msgStr);

            //console.log(message.ping.target+': '+message.ping.rcvd);

            io.to(sessionID).emit(topic, message);
        } catch (e) {
            console.log(e);
       }
    });

};
