'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	validators = require('mongoose-validators'),
	i18n = require('./i18n.server.models'),
	Schema = mongoose.Schema;

/**
 * Device Schema
 */
var DeviceSchema = new Schema({
	manufacturer: {
		type: String,
		default: '',
		required: 'Please fill Device name',
		trim: true
	},
	model: {
		type: String,
		default: ''
	},
	ip: {
		type: String,
		validate: validators.isIP(),
		default: ''
	},
	description: i18n.langSchema(String),
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('Device', DeviceSchema);
