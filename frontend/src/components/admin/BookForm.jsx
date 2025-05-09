import React from 'react';
import { useBooks } from '../../contexts/BooksContext';

const BookForm = () => {
  const { 
    title, 
    setTitle, 
    author, 
    setAuthor, 
    content, 
    setContent, 
    isEditing, 
    handleAddBook, 
    handleEditBook,
    setIsEditing,
    setSelectedBook
  } = useBooks();

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedBook(null);
    setTitle('');
    setAuthor('');
    setContent('');
  };

  return (
    <div className="admin-section">
      <h2>{isEditing ? 'Edytuj książkę' : 'Dodaj książkę'}</h2>
      <form className="book-form" onSubmit={isEditing ? handleEditBook : handleAddBook}>
        <input
          className="auth-input"
          type="text"
          id="title"
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="text"
          id="author"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <textarea
          className="content-input"
          placeholder="Treść książki"
          value={content}
          onChange={(e) => setContent(e.target.value)}
          rows="5"
        />
        <div className="form-buttons">
          <button className="add-button" type="submit">
            {isEditing ? 'Zapisz zmiany' : 'Dodaj'}
          </button>
          {isEditing && (
            <button
              className="cancel-button"
              type="button"
              onClick={handleCancel}
            >
              Anuluj
            </button>
          )}
        </div>
      </form>
    </div>
  );
};

export default BookForm; 