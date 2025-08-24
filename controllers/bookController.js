const { Book } = require("../models");

// CREATE a new book
exports.createBook = async (req, res) => {
  console.log("👉 createBook hit");
  console.log("Request body:", req.body);

  try {
    const { title, author, isbn, available } = req.body;

    const book = await Book.create({
      title,
      author,
      isbn,
      available
    });

    console.log("✅ Book created:", book.toJSON());
    res.status(201).json(book);
  } catch (err) {
    console.error("❌ Error in createBook:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// READ all books
exports.getBooks = async (req, res) => {
  console.log("👉 getBooks hit");

  try {
    const books = await Book.findAll();
    console.log("✅ Books fetched:", books.length, "records");
    res.json(books);
  } catch (err) {
    console.error("❌ Error in getBooks:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// READ a single book by ID
exports.getBookById = async (req, res) => {
  console.log("👉 getBookById hit, ID:", req.params.id);

  try {
    const book = await Book.findByPk(req.params.id);
    if (!book) {
      console.warn("⚠️ Book not found:", req.params.id);
      return res.status(404).json({ error: "Book not found" });
    }
    console.log("✅ Book found:", book.toJSON());
    res.json(book);
  } catch (err) {
    console.error("❌ Error in getBookById:", err.message);
    res.status(500).json({ error: err.message });
  }
};

// ✅ Partial update handler with updatedAt refresh
exports.updateBook = async (req, res) => {
  console.log("👉 updateBook hit, ID:", req.params.id);
  console.log("Update body:", req.body);

  try {
    // Step 1: Find the book first
    const book = await Book.findByPk(req.params.id);

    if (!book) {
      console.warn("⚠️ Book not found to update:", req.params.id);
      return res.status(404).json({ error: "Book not found" });
    }

    // Step 2: Merge provided fields + always refresh updatedAt
    const updates = {
      ...req.body,
      updatedAt: new Date()
    };

    // Step 3: Apply updates
    await book.update(updates);

    console.log("✅ Book updated:", book.toJSON());
    res.json(book);
  } catch (err) {
    console.error("❌ Error in updateBook:", err.message);
    res.status(500).json({ error: err.message });
  }
};





// DELETE a book by ID
exports.deleteBook = async (req, res) => {
  console.log("👉 deleteBook hit, ID:", req.params.id);

  try {
    const deleted = await Book.destroy({
      where: { id: req.params.id }
    });

    if (!deleted) {
      console.warn("⚠️ Book not found to delete:", req.params.id);
      return res.status(404).json({ error: "Book not found" });
    }

    console.log("✅ Book deleted, ID:", req.params.id);
    res.json({ message: "Book deleted successfully" });
  } catch (err) {
    console.error("❌ Error in deleteBook:", err.message);
    res.status(500).json({ error: err.message });
  }
};
