'use strict';

/**
 * Module dependencies.
 */
var _ = require('lodash');
var config = require('../../config/config');
var jwt = require('jsonwebtoken');


exports.verifyToken = function(req,next){

    var token;
    ///get the authorization token from the request headers, or from a cookie
    if (req.headers && req.headers.authorization) {
        var parts = req.headers.authorization.split(' ');
        if (parts.length == 2) {
            var scheme = parts[0];
            var credentials = parts[1];

            if (/^Bearer$/i.test(scheme)) {
                token = credentials;
            }
        }
    }else if(req.cookies && req.cookies.token){
        token = req.cookies.token;
    }

    jwt.verify(token, config.sessionSecret, function(err, decoded) {
        next(err,decoded);
    });
};
