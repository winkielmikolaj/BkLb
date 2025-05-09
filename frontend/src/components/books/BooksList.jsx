import React, { useEffect } from 'react';
import { useBooks } from '../../contexts/BooksContext';
import BookTile from './BookTile';

const BooksList = () => {
  const { books, setSelectedBook, setActiveView } = useBooks();
  
  // Set active view to catalog when component mounts
  useEffect(() => {
    setActiveView('catalog');
  }, [setActiveView]);

  // Zabezpieczenie przed błędami
  if (!books || !Array.isArray(books) || books.length === 0) {
    return (
      <div className="books-grid">
        <p>Brak dostępnych książek.</p>
      </div>
    );
  }

  return (
    <div className="books-grid">
      {books.map((book) => (
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