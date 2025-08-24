// controllers/issueController.js
const { IssuedBook, Book } = require('../models');

// Function to issue a book
exports.issueBook = async (req, res, next) => {
    try {
        const { userId, bookId } = req.body;

        // Find the book and check its availability
        const book = await Book.findByPk(bookId);
        if (!book) {
            return res.status(404).json({ message: 'Book not found.' });
        }
        if (!book.available) {
            return res.status(409).json({ message: 'Book is not available.' });
        }

        // Create a new issued book record
        const issuedBook = await IssuedBook.create({
            userId,
            bookId,
            issueDate: new Date(),
        });

        // Update book availability to false
        await book.update({ available: false });

        res.status(201).json({ message: 'Book issued successfully.', issuedBook });
    } catch (error) {
        next(error);
    }
};

// Function to get all issued books
exports.getIssuedBooks = async (req, res, next) => {
    try {
        const issuedBooks = await IssuedBook.findAll({
            include: [{ model: Book }, { model: User }],
        });
        res.status(200).json(issuedBooks);
    } catch (error) {
        next(error);
    }
};

// Function to get a single issued book by ID
exports.getIssuedBookById = async (req, res, next) => {
    try {
        const issuedBook = await IssuedBook.findByPk(req.params.id, {
            include: [{ model: Book }, { model: User }],
        });
        if (!issuedBook) {
            return res.status(404).json({ message: 'Issued book record not found.' });
        }
        res.status(200).json(issuedBook);
    } catch (error) {
        next(error);
    }
};

// Function to return a book
exports.returnBook = async (req, res, next) => {
    try {
        const issuedBook = await IssuedBook.findByPk(req.params.id);
        if (!issuedBook) {
            return res.status(404).json({ message: 'Issued book record not found.' });
        }

        // Update the return date
        await issuedBook.update({ returnDate: new Date() });

        // Update book availability to true
        const book = await Book.findByPk(issuedBook.bookId);
        if (book) {
            await book.update({ available: true });
        }

        res.status(200).json({ message: 'Book returned successfully.', issuedBook });
    } catch (error) {
        next(error);
    }
}