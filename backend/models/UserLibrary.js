const { db } = require('../db');

// Model biblioteki użytkownika
class UserLibrary {
  // Dodaje książkę do biblioteki
  static addToLibrary(userId, bookId) {
    try {
      const stmt = db.prepare('INSERT INTO user_library (user_id, book_id) VALUES (?, ?)');
      const result = stmt.run(userId, bookId);
      return result;
    } catch (error) {
      console.error('Error adding book to library:', error);
      throw error;
    }
  }

  // Usuwa książkę z biblioteki
  static removeFromLibrary(userId, bookId) {
    try {
      const stmt = db.prepare('DELETE FROM user_library WHERE user_id = ? AND book_id = ?');
      const result = stmt.run(userId, bookId);
      return result;
    } catch (error) {
      console.error('Error removing book from library:', error);
      throw error;
    }
  }

  // Pobiera bibliotekę użytkownika
  static getUserLibrary(userId) {
    try {
      const stmt = db.prepare(`
        SELECT b.* 
        FROM books b
        INNER JOIN user_library ul ON b.id = ul.book_id
        WHERE ul.user_id = ?
      `);
      return stmt.all(userId);
    } catch (error) {
      console.error('Error getting user library:', error);
      throw error;
    }
  }

  // Sprawdza czy książka jest w bibliotece
  static isInLibrary(userId, bookId) {
    try {
      const stmt = db.prepare('SELECT * FROM user_library WHERE user_id = ? AND book_id = ?');
      const result = stmt.get(userId, bookId);
      return !!result;
    } catch (error) {
      console.error('Error checking if book is in library:', error);
      throw error;
    }
  }
}

module.exports = UserLibrary; 