import React from 'react';
import { useBooks } from '../../contexts/BooksContext';
import { RiBookmarkLine, RiBookmarkFill, RiDeleteBin6Line, RiFileTextLine, RiFireFill, RiAwardFill } from 'react-icons/ri';

const BookTile = ({ book, onClick, isLibraryView = false }) => {
  const { userLibrary = [], handleAddToLibrary, handleRemoveFromLibrary, allFavorites } = useBooks();

  // Zabezpieczenie przed undefined
  if (!book) return null;

  // Sprawdzenie czy książka jest w bibliotece
  const isInLibrary = userLibrary && Array.isArray(userLibrary) && 
    userLibrary.some(libBook => libBook && libBook.id === book.id);

  // Sprawdzenie czy to najpopularniejsza książka
  const isPopular = allFavorites && 
                   Array.isArray(allFavorites) && 
                   allFavorites.length > 0 && 
                   allFavorites[0].id === book.id;
    
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
      <div className="book-image-container">
        <div className="book-image-placeholder">
          <div className="book-image-text">{book.title ? book.title.charAt(0) : '?'}</div>
        </div>
        {isPopular && (
          <div className="popular-badge">
            <RiFireFill />
            <span>Popularna</span>
          </div>
        )}
        {book.content && <div className="has-content-badge">Treść</div>}
      </div>
      <div className="book-tile-info">
        <h3 className="book-title">{book.title || 'Bez tytułu'}</h3>
        <p className="book-author">{book.author || 'Nieznany autor'}</p>
        
        <div className="book-actions" onClick={(e) => e.stopPropagation()}>
          {isLibraryView ? (
            <button
              className="btn btn-danger btn-block"
              onClick={(e) => {
                e.stopPropagation();
                if (book && book.id) {
                  handleRemoveFromLibrary(book.id);
                }
              }}
            >
              <RiDeleteBin6Line />
              <span>Usuń z biblioteki</span>
            </button>
          ) : (
            <button
              className={`btn btn-block ${isInLibrary ? 'btn-danger' : 'btn-primary'}`}
              onClick={handleLibraryAction}
            >
              {isInLibrary ? (
                <>
                  <RiBookmarkFill />
                  <span>Usuń z biblioteki</span>
                </>
              ) : (
                <>
                  <RiBookmarkLine />
                  <span>Dodaj do biblioteki</span>
                </>
              )}
            </button>
          )}
        </div>
      </div>
    </div>
  );
};

export default BookTile; 