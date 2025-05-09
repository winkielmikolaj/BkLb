import React from 'react';
import { useBooks } from '../../contexts/BooksContext';
import { RiArrowLeftSLine, RiArrowRightSLine, RiBook2Line, RiUserLine } from 'react-icons/ri';

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
    <div className="book-details mt-5">
      <div className="book-details-header">
        <div className="book-cover">
          <div className="book-image-placeholder">
            <div className="book-image-text">{book.title ? book.title.charAt(0) : '?'}</div>
          </div>
        </div>
        
        <div className="book-info-container">
          <h2 className="book-info-title">{book.title || 'Bez tytułu'}</h2>
          <p className="book-info-author"><RiUserLine /> {book.author || 'Nieznany autor'}</p>
          
          <div className="book-meta">
            <div className="book-meta-item">
              <span className="meta-label">Identyfikator</span>
              <span className="meta-value">{book.id}</span>
            </div>
            <div className="book-meta-item">
              <span className="meta-label">Treść</span>
              <span className="meta-value">{book.content ? 'Dostępna' : 'Brak'}</span>
            </div>
          </div>
        </div>
      </div>
      
      {book.content ? (
        <div className="book-content">
          <h2><RiBook2Line /> Treść książki</h2>
          <div className="book-content-text">
            <p>{currentContent}</p>
          </div>
          {totalPages > 1 && (
            <div className="pagination">
              <button
                className="page-button"
                onClick={() => setPage(prev => Math.max(1, prev - 1))}
                disabled={currentPageSafe === 1}
              >
                <RiArrowLeftSLine />
              </button>
              <span className="page-info">
                Strona {currentPageSafe} z {totalPages}
              </span>
              <button
                className="page-button"
                onClick={() => setPage(prev => Math.min(totalPages, prev + 1))}
                disabled={currentPageSafe === totalPages}
              >
                <RiArrowRightSLine />
              </button>
            </div>
          )}
        </div>
      ) : (
        <div className="book-content">
          <p className="text-center">Ta książka nie ma dodanej treści.</p>
        </div>
      )}
    </div>
  );
};

export default BookDetails; 