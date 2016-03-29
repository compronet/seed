'use strict';

/**
 * Created by oguzhan on 28.02.16.
 */
var config = require('../../config/config');
exports.langSchema = function(type, strdefault) {
	var stringSchema = {};
	var stringConf = {
		type: type,
		default: strdefault ? strdefault : ''
	};
	config.languages.forEach(function(lang) {
		stringSchema[lang] = stringConf;
	});

	return stringSchema;
};
