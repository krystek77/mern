const express = require('express');
const usersController = require('../controllers/user');
const router = express.Router();

//@route '/users/login POST
//@route '/users/register POST
//@route '/users/:userID' DELETE
//@route '/users/ GET
//@route '/users/:userID' GET

router.post('/register', usersController.registerUser);
router.get('/', usersController.getUsers);
router.get('/:userID', usersController.getUserById);
router.delete('/:userID', usersController.deleteUserById);
router.post('/login', usersController.loginUser);

module.exports = router;
