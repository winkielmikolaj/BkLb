import React, { useEffect } from 'react';
import { useBooks } from '../../contexts/BooksContext';
import BookTile from './BookTile';

const UserLibrary = () => {
  const { userLibrary, setSelectedBook, fetchUserLibrary } = useBooks();

  useEffect(() => {
    fetchUserLibrary();
  }, [fetchUserLibrary]);

  // Zabezpieczenie przed błędami
  if (!userLibrary || !Array.isArray(userLibrary)) {
    return (
      <div className="books-grid">
        <p>Ładowanie biblioteki...</p>
      </div>
    );
  }

  return (
    <div className="books-grid">
      {userLibrary.length === 0 ? (
        <p>Twoja biblioteka jest pusta.</p>
      ) : (
        userLibrary.map((book) => (
          book && <BookTile 
            key={book.id || Math.random().toString()} 
            book={book}
            onClick={() => setSelectedBook(book)}
            isLibraryView={true}
          />
        ))
      )}
    </div>
  );
};

export default UserLibrary; 