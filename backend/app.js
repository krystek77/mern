const express = require('express');
const mongoose = require('mongoose');
const morgan = require('morgan');
const cors = require('cors');
const bodyParser = require('body-parser');
const app = express();

const todoRoutes = require('./api/routes/todo');
const userRoutes = require('./api/routes/user');



app.use(cors());
app.use(morgan('dev'));

//Expose body from request HTTP POST method
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

//Connect to Database
const URL_DB =
	'mongodb+srv://mern-todo-app:' +
	process.env.MONGO_ATLAS_PW +
	'@mern-todo-app-my45n.mongodb.net/test?retryWrites=true';
mongoose
	.connect(URL_DB, { useNewUrlParser: true })
	.then(result => {
		console.log(`Connected to database successful...`);
	})
	.catch(error => {
		console.log('Failed connection');
	});

app.use('/todos', todoRoutes);
app.use('/users', userRoutes);

//Handle Errors
app.use((req, res, next) => {
	const error = new Error();
	error.status = 404;
	error.message = `Not found ${req.url}`;
	next(error);
});
app.use((error, req, res, next) => {
	res.status(error.status || 500).json({
		error,
	});
});

module.exports = app;
