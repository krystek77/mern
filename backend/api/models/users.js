const mongoose = require('mongoose');

const userSchema = mongoose.Schema(
	{
		_id: mongoose.Schema.Types.ObjectId,
		email: {
			type: String,
			required: true,
			unique: true,
		},
		password: {
			type: String,
			required: true,
		},
		tasks: [
			{
				type: mongoose.Schema.Types.ObjectId,
				ref: 'ToDoTask',
			},
		],
	},
	{ timestamps: true }
);

module.exports = mongoose.model('User', userSchema);
