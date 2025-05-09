import React from 'react';
import { useBooks } from '../../contexts/BooksContext';

const BookTile = ({ book, onClick, isLibraryView = false }) => {
  const { userLibrary = [], handleAddToLibrary, handleRemoveFromLibrary } = useBooks();

  // Zabezpieczenie przed undefined
  if (!book) return null;

  // Sprawdzenie czy książka jest w bibliotece
  const isInLibrary = userLibrary && Array.isArray(userLibrary) && 
    userLibrary.some(libBook => libBook && libBook.id === book.id);

  const handleLibraryAction = (e) => {
    e.stopPropagation();
    if (isInLibrary) {
      handleRemoveFromLibrary(book.id);
    } else {
      handleAddToLibrary(book.id);
    }
  };

  return (
    <div 
      className="book-tile"
      onClick={onClick}
    >
      <div className="book-image-placeholder">
        <div className="book-image-text">{book.title ? book.title.charAt(0) : '?'}</div>
      </div>
      <div className="book-tile-info">
        <h3 className="book-title">{book.title || 'Bez tytułu'}</h3>
        <p className="book-author">{book.author || 'Nieznany autor'}</p>
        {book.content && <span className="has-content">✓</span>}
        <div className="book-actions" onClick={(e) => e.stopPropagation()}>
          {isLibraryView ? (
            <button
              className="remove-from-library-button"
              onClick={(e) => {
                e.stopPropagation();
                if (book && book.id) {
                  handleRemoveFromLibrary(book.id);
                }
              }}
            >
              Usuń z biblioteki
            </button>
          ) : (
            <button
              className={isInLibrary ? 'remove-from-library-button' : 'add-to-library-button'}
              onClick={handleLibraryAction}
            >
              {isInLibrary ? 'Usuń z biblioteki' : 'Dodaj do biblioteki'}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTile; 