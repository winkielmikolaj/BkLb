import React from 'react';
import { useBooks } from '../../contexts/BooksContext';

const AdminBooksList = () => {
  const { books, startEditing, handleDeleteBook } = useBooks();

  return (
    <div className="admin-section">
      <h2>Zarządzanie książkami</h2>
      <div className="admin-books-list">
        {books.map((book) => (
          <div key={book.id} className="admin-book-item">
            <div className="admin-book-info">
              <h3>{book.title}</h3>
              <p>Autor: {book.author}</p>
            </div>
            <div className="admin-book-actions">
              <button
                className="edit-button"
                onClick={() => startEditing(book)}
              >
                Edytuj
              </button>
              <button
                className="delete-button"
                onClick={() => handleDeleteBook(book.id)}
              >
                Usuń
              </button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AdminBooksList; 