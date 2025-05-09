import React, { useEffect } from 'react';
import { useBooks } from '../../contexts/BooksContext';
import BookTile from './BookTile';

const BooksList = () => {
  const { books, filteredBooks, searchTerm, setSelectedBook, setActiveView, allFavorites, fetchAllFavorites } = useBooks();
  
  // Set active view to catalog when component mounts
  useEffect(() => {
    setActiveView('catalog');
    // Upewniamy się, że mamy najnowsze dane o popularności
    fetchAllFavorites();
  }, [setActiveView, fetchAllFavorites]);

  // Używamy filteredBooks jeśli jest searchTerm, w przeciwnym razie books
  const displayBooks = searchTerm ? filteredBooks : books;

  // Zabezpieczenie przed błędami
  if (!displayBooks || !Array.isArray(displayBooks) || displayBooks.length === 0) {
    return (
      <div className="books-grid">
        <p>{searchTerm ? 'Nie znaleziono książek spełniających kryteria wyszukiwania.' : 'Brak dostępnych książek.'}</p>
      </div>
    );
  }

  // Znajdź popularną książkę
  const getMostPopularBookId = () => {
    if (allFavorites && Array.isArray(allFavorites) && allFavorites.length > 0) {
      return allFavorites[0].id;
    }
    return null;
  };

  const popularBookId = getMostPopularBookId();

  return (
    <div className="books-grid">
      {displayBooks.map((book) => (
        book && <BookTile 
          key={book.id || Math.random().toString()} 
          book={book}
          onClick={() => setSelectedBook(book)}
        />
      ))}
    </div>
  );
};

export default BooksList; 