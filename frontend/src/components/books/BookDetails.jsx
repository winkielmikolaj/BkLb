import React from 'react';
import { useBooks } from '../../contexts/BooksContext';

const BookDetails = () => {
  const { selectedBook, currentPage, setCurrentPage, splitContentIntoPages } = useBooks();

  if (!selectedBook) return null;

  // Bezpieczne podzielenie treści na strony (zabezpieczenie przed undefined)
  const contentPages = selectedBook.content ? splitContentIntoPages(selectedBook.content) : [];
  const totalPages = contentPages.length;
  
  // Zabezpieczenie przed błędami indeksowania
  const currentPageSafe = Math.max(1, Math.min(currentPage, totalPages || 1));
  const currentContent = contentPages[currentPageSafe - 1] || '';

  return (
    <div className="book-details">
      <h2>{selectedBook.title || 'Bez tytułu'}</h2>
      <p className="book-author">Autor: {selectedBook.author || 'Nieznany autor'}</p>
      {selectedBook.content ? (
        <div className="book-content">
          <h3>Treść:</h3>
          <div className="book-page">
            <p>{currentContent}</p>
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-button"
                onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                disabled={currentPageSafe === 1}
              >
                Poprzednia
              </button>
              <span className="page-info">
                Strona {currentPageSafe} z {totalPages}
              </span>
              <button
                className="page-button"
                onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPageSafe === totalPages}
              >
                Następna
              </button>
            </div>
          )}
        </div>
      ) : (
        <p>Ta książka nie ma dodanej treści.</p>
      )}
    </div>
  );
};

export default BookDetails; 