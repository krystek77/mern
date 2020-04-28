const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
const User = require('../models/users');
const jwt = require('jsonwebtoken');

exports.registerUser = (req, res, next) => {
	User.find({ email: req.body.email })
		.then(user => {
			if (user.length > 0) {
				return res.status(422).json({
					message: 'Mail exists',
				});
			} else {
				bcrypt.hash(req.body.password, 10, (error, hashPassword) => {
					if (error) {
						return res.status(500).json(error);
					} else {
						const newUser = new User({
							_id: new mongoose.Types.ObjectId(),
							email: req.body.email,
							password: hashPassword,
						});

						newUser
							.save()
							.then(result => {
								res.status(201).json({
									message: 'User created successful',
									user: result,
								});
							})
							.catch(error => {
								res.status(500).json(error);
							});
					}
				});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
};
exports.getUsers = (req, res, next) => {
	User.find()
		.select('_id email password createdAt updatedAt')
		.populate('tasks', 'description')
		.then(users => {
			res.status(200).json({
				count: users.length,
				users: users,
			});
		})
		.catch(error => {
			res.status(500).json(error);
		});
};
exports.getUserById = (req, res, next) => {
	const id = req.params.userID;
	User.findOne({ _id: id })
		.select('_id email password createdAt updatedAt')
		.then(user => {
			if (user) {
				return res.status(200).json({
					user: user,
					request: {
						type: 'GET',
						url: 'http://localhost:4000/users',
					},
				});
			} else {
				return res.status(404).json({
					message: `User with ID ${id} doesn't exist`,
				});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
};
exports.deleteUserById = (req, res, next) => {
	const id = req.params.userID;
	User.findOne({ _id: id })
		.then(user => {
			if (user) {
				User.remove({ _id: id })
					.then(result => {
						res.status(200).json({
							message: `User width ID ${id} deleted succesfull`,
						});
					})
					.catch(error => {
						res.status(500).json(error);
					});
			} else {
				return res.status(404).json({
					message: `User with ID ${id} doesn't exist`,
				});
			}
		})
		.catch(error => {
			res.status(500).json(error);
		});
};
exports.loginUser = (req, res, next) => {
	const email = req.body.email;

	User.find({ email: email })
		.then(user => {
			if (user.length > 0) {
				bcrypt.compare(req.body.password, user[0].password, (error, result) => {
					if (result) {
						jwt.sign(
							{
								email: user[0].email,
								userID: user[0]._id,
							},
							process.env.JWT_KEY,
							{
								expiresIn: '1h',
							},
							(error, token) => {
								if (error) {
									res.status(401).json({
										message: 'Failed to create token',
									});
								}
								return res.status(200).json({
									message: `Auth successful`,
									token: token,
									user: {
										email: user[0].email,
										userID: user[0]._id,
									},
								});
							}
						);
						// return res.status(200).json({
						// 	message: `Auth successful`,
						// 	token: token,
						// 	user: {
						// 		email: user[0].email,
						// 	},
						// });
					} else {
						return res.status(401).json({
							message: `Wrong password - Auth failed`,
						});
					}
				});
			} else {
				//Not founded user with that email
				return res.status(401).json({
					message: `User with email ${email} doesn't exist - Auth failed`,
				});
			}
		})
		.catch(error => res.status(500).json(error));
};
