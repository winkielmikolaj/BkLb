const UserLibrary = require('../models/UserLibrary');

exports.getUserLibrary = (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    if (!userId) {
      return res.status(400).json({ error: "Invalid user ID" });
    }

    const library = UserLibrary.getUserLibrary(userId);
    res.json(library);
  } catch (error) {
    console.error("Error getting user library:", error);
    res.status(500).json({ error: "Error getting user library" });
  }
};

exports.addToLibrary = (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const { bookId } = req.body;

    if (!userId || !bookId) {
      return res.status(400).json({ error: "User ID and book ID are required" });
    }

    // Sprawdź czy książka jest już w bibliotece
    if (UserLibrary.isInLibrary(userId, bookId)) {
      return res.status(400).json({ error: "Book is already in library" });
    }

    UserLibrary.addToLibrary(userId, bookId);
    res.json({ message: "Book added to library successfully" });
  } catch (error) {
    console.error("Error adding book to library:", error);
    res.status(500).json({ error: "Error adding book to library" });
  }
};

exports.removeFromLibrary = (req, res) => {
  try {
    const userId = parseInt(req.params.userId);
    const bookId = parseInt(req.params.bookId);

    if (!userId || !bookId) {
      return res.status(400).json({ error: "User ID and book ID are required" });
    }

    // Sprawdź czy książka jest w bibliotece
    if (!UserLibrary.isInLibrary(userId, bookId)) {
      return res.status(400).json({ error: "Book is not in library" });
    }

    UserLibrary.removeFromLibrary(userId, bookId);
    res.json({ message: "Book removed from library successfully" });
  } catch (error) {
    console.error("Error removing book from library:", error);
    res.status(500).json({ error: "Error removing book from library" });
  }
}; 