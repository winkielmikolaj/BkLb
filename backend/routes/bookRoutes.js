const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// Obsługa GET /api/books
router.get("/", bookController.getAllBooks);

// Obsługa POST /api/books
router.post("/", bookController.addBook);

// Obsługa PUT /api/books/:id
router.put("/:id", bookController.updateBook);

// Obsługa DELETE /api/books/:id
router.delete("/:id", bookController.deleteBook);

module.exports = router;