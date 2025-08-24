const express = require("express");
const router = express.Router();   // ✅ use express.Router()

const bookController = require("../controllers/bookController");

// Create a book
router.post("/", bookController.createBook);

// Get all books
router.get("/", bookController.getBooks);

// Get book by ID
router.get("/:id", bookController.getBookById);

// Update book by ID
router.put("/:id", bookController.updateBook);

// Delete book by ID
router.delete("/:id", bookController.deleteBook);

module.exports = router;