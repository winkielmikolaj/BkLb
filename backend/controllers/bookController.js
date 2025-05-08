const Book = require("../models/book");

exports.getAllBooks = (req, res) => {
  try {
    const books = Book.getAll();
    res.json(books);
  } catch (error) {
    console.error("Błąd getAllBooks:", error.message);
    res.status(500).json({ error: "Błąd pobierania książek" });
  }
};

exports.addBook = (req, res) => {
  try {
    const { title, author, content } = req.body;

    if (!title || !author) {
      return res.status(400).json({ error: "Brakuje tytułu lub autora" });
    }

    const newBook = Book.create({ title, author, content });
    res.status(201).json(newBook);
  } catch (error) {
    console.error("Błąd addBook:", error.message);
    res.status(500).json({ error: "Błąd dodawania książki" });
  }
};

exports.updateBook = (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const updates = req.body;

    if (Object.keys(updates).length === 0) {
      return res.status(400).json({ error: "Brak danych do aktualizacji" });
    }

    const updatedBook = Book.update(bookId, updates);

    if (!updatedBook) {
      return res.status(404).json({ error: "Książka nie znaleziona" });
    }

    res.json(updatedBook);
  } catch (error) {
    console.error("Błąd updateBook:", error.message);
    res.status(500).json({ error: "Błąd aktualizacji książki" });
  }
};

exports.deleteBook = (req, res) => {
  try {
    const bookId = parseInt(req.params.id);
    const book = Book.getById(bookId);

    if (!book) {
      return res.status(404).json({ error: "Książka nie znaleziona" });
    }

    Book.delete(bookId);
    res.json({ message: "Książka została usunięta" });
  } catch (error) {
    console.error("Błąd deleteBook:", error.message);
    res.status(500).json({ error: "Błąd usuwania książki" });
  }
};
