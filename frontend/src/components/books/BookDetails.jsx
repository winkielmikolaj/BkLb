import React from 'react';
import { useBooks } from '../../contexts/BooksContext';

const BookDetails = () => {
  const { 
    activeView,
    selectedBook, 
    selectedLibraryBook,
    currentPage, 
    setCurrentPage,
    currentLibraryPage,
    setCurrentLibraryPage,
    splitContentIntoPages 
  } = useBooks();
  
  // Get the correct book based on active view
  const book = activeView === 'library' ? selectedLibraryBook : selectedBook;
  
  // Get the correct page state based on active view
  const page = activeView === 'library' ? currentLibraryPage : currentPage;
  const setPage = activeView === 'library' ? setCurrentLibraryPage : setCurrentPage;

  if (!book) return null;

  // Bezpieczne podzielenie treści na strony (zabezpieczenie przed undefined)
  const contentPages = book.content ? splitContentIntoPages(book.content) : [];
  const totalPages = contentPages.length;
  
  // Zabezpieczenie przed błędami indeksowania
  const currentPageSafe = Math.max(1, Math.min(page, totalPages || 1));
  const currentContent = contentPages[currentPageSafe - 1] || '';

  return (
    <div className="book-details">
      <h2>{book.title || 'Bez tytułu'}</h2>
      <p className="book-author">Autor: {book.author || 'Nieznany autor'}</p>
      {book.content ? (
        <div className="book-content">
          <h3>Treść:</h3>
          <div className="book-page">
            <p>{currentContent}</p>
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-button"
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={currentPageSafe === 1}
              >
                Poprzednia
              </button>
              <span className="page-info">
                Strona {currentPageSafe} z {totalPages}
              </span>
              <button
                className="page-button"
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
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