const { db } = require('../db'); // Upewnij się, że ścieżka do db.js jest poprawna

class Book {
  static getAll() {
    return db.prepare('SELECT * FROM books').all();
  }

  static getById(id) {
    return db.prepare('SELECT * FROM books WHERE id = ?').get(id);
  }

  static create({ title, author }) {
    const result = db.prepare(`
      INSERT INTO books (title, author) 
      VALUES (?, ?)
    `).run(title, author);

    return this.getById(result.lastInsertRowid);
  }

  static update(id, { title, author, is_rented }) {
    db.prepare(`
      UPDATE books 
      SET title = ?, author = ?, is_rented = ?
      WHERE id = ?
    `).run(title, author, is_rented, id);
    
    return this.getById(id);
  }

  static delete(id) {
    db.prepare('DELETE FROM books WHERE id = ?').run(id);
  }
}

module.exports = Book;