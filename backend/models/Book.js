let books = [
    { id: 1, title: "Książka 1", author: "Autor 1" },
    { id: 2, title: "Książka 2", author: "Autor 2" },
  ];
  
  class Book {
    static getAll() {
      return books;
    }
  
    static getById(id) {
      return books.find((book) => book.id === id);
    }
  
    static create({ title, author }) {
      const newBook = { id: books.length + 1, title, author };
      books.push(newBook);
      return newBook;
    }
  
    static update(id, updates) {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) return null;
  
      books[bookIndex] = { ...books[bookIndex], ...updates };
      return books[bookIndex];
    }
  
    static delete(id) {
      const bookIndex = books.findIndex((book) => book.id === id);
      if (bookIndex === -1) return null;
  
      const deletedBook = books.splice(bookIndex, 1);
      return deletedBook;
    }
  }
  
  module.exports = Book;