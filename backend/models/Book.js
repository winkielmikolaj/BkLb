const { db } = require('../db');

class Book {
  static getAll() {
    const stmt = db.prepare('SELECT * FROM books');
    return stmt.all();
  }

  static getById(id) {
    const stmt = db.prepare('SELECT * FROM books WHERE id = ?');
    return stmt.get(id);
  }

  static create({ title, author }) {
    const stmt = db.prepare('INSERT INTO books (title, author) VALUES (?, ?)');
    const result = stmt.run(title, author);
    return this.getById(result.lastInsertRowid);
  }

  static update(id, updates) {
    const book = this.getById(id);
    if (!book) return null;

    const { title, author } = updates;
    const stmt = db.prepare('UPDATE books SET title = ?, author = ? WHERE id = ?');
    stmt.run(title || book.title, author || book.author, id);
    return this.getById(id);
  }

  static delete(id) {
    const book = this.getById(id);
    if (!book) return null;

    const stmt = db.prepare('DELETE FROM books WHERE id = ?');
    stmt.run(id);
    return book;
  }
}

module.exports = Book;