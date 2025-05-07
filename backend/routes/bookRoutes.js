const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");

// endpoints
router.get("/books", bookController.getAllBooks);
router.post("/books", bookController.addBook);
router.delete("/books/:id", bookController.deleteBook);
router.put("/books/:id", bookController.updateBook);

module.exports = router;