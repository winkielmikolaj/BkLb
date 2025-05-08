const express = require("express");
const router = express.Router();
const bookController = require("../controllers/bookController");
const { checkRole } = require('../middleware/authMiddleware');

// Publiczne endpointy
router.get("/", bookController.getAllBooks);

// Endpointy wymagające roli admin
router.post("/", checkRole(['admin']), bookController.addBook);
router.put("/:id", checkRole(['admin']), bookController.updateBook);
router.delete("/:id", checkRole(['admin']), bookController.deleteBook);

module.exports = router;