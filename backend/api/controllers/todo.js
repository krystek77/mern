const mongoose = require('mongoose');
const ToDoTask = require('../models/todo');
const User = require('../models/users');

exports.getAllToDoTasks = (req, res, next) => {
	ToDoTask.find()
		.select('_id description prioryty date untilWhen finished')
		.populate('user')
		.then(todos => {
			console.log(todos);
			const count = todos.length;
			res.status(200).json({
				count: count,
				todos: todos,
			});
		})
		.catch(error => {
			console.log(error);
			res.status(404).json(error);
		});
};

exports.getToDoTaskById = (req, res, next) => {
	const id = req.params.id;
	ToDoTask.findById({ _id: id })
		.select('_id description prioryty date untilWhen finished')
		.then(todo => {
			if (!todo) {
				res.status(404).json({
					message: `Task with ID ${id} doesn't exist`,
				});
			} else {
				console.log(todo);
				res.status(200).json(todo);
			}
		})
		.catch(error => {
			console.log(error);
			res.status(404).json({
				message: `Invalid ID ${id}`,
			});
		});
};
exports.createToDoTask = (req, res, next) => {
	const userID = req.body.userID;
	User.findById({ _id: userID })
		.then(user => {
			if (!user) {
				return res.status(404).json({
					message: "User doesn't exist",
				});
			}
			const newToDo = new ToDoTask({
				_id: mongoose.Types.ObjectId(),
				description: req.body.description,
				prioryty: req.body.prioryty,
				finished: req.body.finished,
				untilWhen: req.body.untilWhen,
				user: userID,
			});
			user.tasks.push(newToDo);
			user.save();
			return newToDo.save();
		})
		.then(result => {
			console.log(result);
			console.log(userID);
			console.log(req.body);
			res.status(201).json({
				message: `Todo task added successful`,
			});
		})
		.catch(error => {
			console.log(error);
			res.status(404).json({
				message: 'Adding new task failed',
				error,
			});
		});
};
exports.updateToDoTaskById = (req, res, next) => {
	const id = req.params.id;
	ToDoTask.findById({ _id: req.params.id })
		.then(task => {
			if (!task) {
				res.status(404).json({
					message: `To do task with ID ${id} doesn't exist in database`,
				});
			} else {
				task.description = req.body.description;
				task.prioryty = req.body.prioryty;
				task.finished = req.body.finished;
				task.untilWhen = req.body.untilWhen;
				task.date = req.body.date;

				task.save()
					.then(result => {
						console.log('Task updated succesful');
						console.log(result);
						res.status(201).json({
							message: `Task with ID ${id} updated succesful`,
						});
					})
					.catch(error => {
						console.log(error);
						res.status(404).json({
							message: `Updating is not possible`,
						});
					});
			}
		})
		.catch(error => {
			console.log(error);
			res.status(500).json(error);
		});
};
exports.deleteToDoTask = (req, res, next) => {
	const id = req.params.id;
	ToDoTask.findById({ _id: id })
		.then(task => {
			if (!task) {
				res.status(404).json({
					message: `Task with ID ${id} doesn't exist`,
				});
			} else {
				return ToDoTask.remove({ _id: id });
			}
		})
		.then(result => {
			console.log(result);
			res.status(200).json({
				message: `To do task deleted succesful`,
			});
		})
		.catch(error => {
			console.log(error);
			res.status(500).json(error);
		});
};
