'use strict';

/**
 * Module dependencies.
 */
var mongoose = require('mongoose'),
	i18n = require('./i18n.server.models'),
	Schema = mongoose.Schema;

/**
 * App Schema
 */
var AppSchema = new Schema({
	name: {
		type: String,
		default: '',
		required: 'Please fill App name',
		trim: true
	},
	version: {
		type: String,
		default: ''
	},
	description: i18n.langSchema(String),
	port: {
		type: Number,
		default: ''
	},
	path: {
		type: String,
		default: ''
	},
	device: {
		type: Schema.ObjectId,
		ref: 'Device'
	},
	created: {
		type: Date,
		default: Date.now
	},
	user: {
		type: Schema.ObjectId,
		ref: 'User'
	}
});

mongoose.model('App', AppSchema);
