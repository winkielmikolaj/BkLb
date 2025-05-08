const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userLibraryController = require('../controllers/userLibraryController');

// Podstawowe endpointy użytkownika
router.post('/register', userController.register);
router.post('/login', userController.login);

// Endpointy biblioteki użytkownika
router.get('/:userId/library', userLibraryController.getUserLibrary);
router.post('/:userId/library', userLibraryController.addToLibrary);
router.delete('/:userId/library/:bookId', userLibraryController.removeFromLibrary);

module.exports = router; 