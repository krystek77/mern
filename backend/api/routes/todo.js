const express = require('express');
const router = express.Router();
const toDoTaskController = require('../controllers/todo');
const checkAuth = require('../middleware/check-auth');

//@route 	GET /todos/
//@route 	GET /todos/:id
//@route  	POST /todos/add
//@route 	POST /todos/update/:id
//@route    DELETE /todos/delete/:id

router.get('/', toDoTaskController.getAllToDoTasks);
router.get('/:id', toDoTaskController.getToDoTaskById);
router.post('/add', checkAuth, toDoTaskController.createToDoTask);
router.post('/update/:id', toDoTaskController.updateToDoTaskById);
router.delete('/delete/:id', toDoTaskController.deleteToDoTask);

module.exports = router;
