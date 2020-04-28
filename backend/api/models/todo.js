const mongoose = require('mongoose');

const todoSChema = mongoose.Schema({
	_id: mongoose.Schema.Types.ObjectId,
	description: {
		type: String,
		required: true,
	},
	prioryty: {
		type: String,
		required: true,
	},
	finished: Boolean,
	date: {
		type: String,
		default: new Date().toISOString().slice(0, 10),
	},
	untilWhen: {
		type: String,
		default: new Date().toISOString().slice(0, 10),
	},
	user: {
		type: mongoose.Schema.Types.ObjectId,
		ref: 'User',
		required: true,
	},
});

module.exports = mongoose.model('ToDoTask', todoSChema);
