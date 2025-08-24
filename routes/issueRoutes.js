// routes/issueRoutes.js
const express = require('express');
const router = express.Router();
const issueController = require('../controllers/issueController');

// Route to issue a new book
router.post('/', issueController.issueBook);

// Route to get all issued book records
router.get('/', issueController.getIssuedBooks);

// Route to get a specific issued book record by ID
router.get('/:id', issueController.getIssuedBookById);

// Route to return a book
router.put('/:id', issueController.returnBook);

module.exports = router;