const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');

// Route for new user registration
router.post('/register', userController.registerUser);

// Route for user login
router.post('/login', userController.loginUser);

// Route to get all users (Admin only)
router.get('/', userController.getUsers);

// Route to get a single user by ID
router.get('/:id', userController.getUserById);

// Route to update a user by ID (Admin only)
router.put('/:id', userController.updateUser);

// Route to delete a user by ID (Admin only)
router.delete('/:id', userController.deleteUser);

module.exports = router;