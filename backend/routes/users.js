const express = require('express');
const router = express.Router();
const userController = require('../controllers/userController');
const userLibraryController = require('../controllers/userLibraryController');
const auth = require('../middleware/auth');

// endpointy dla uzytkownika
router.post('/register', userController.register);
router.post('/login', userController.login);

// endpointy dla bibliotekik
router.get('/:userId/library', auth, userLibraryController.getUserLibrary);
router.post('/:userId/library', auth, userLibraryController.addToLibrary);
router.delete('/:userId/library/:bookId', auth, userLibraryController.removeFromLibrary);

module.exports = router; 