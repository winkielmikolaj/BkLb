import React, { useEffect, useState } from 'react';
import { useBooks } from '../../contexts/BooksContext';

const BookStats = () => {
  const { books, userLibrary } = useBooks();
  const [stats, setStats] = useState({
    totalBooks: 0,
    booksWithContent: 0,
    booksInLibraries: 0,
    mostPopular: null
  });

  useEffect(() => {
    if (!books || !Array.isArray(books)) return;

    // Liczenie książek z treścią
    const booksWithContent = books.filter(book => book && book.content).length;
    
    // Sprawdzenie liczby książek w bibliotekach użytkowników
    const bookCounts = {};
    if (userLibrary && Array.isArray(userLibrary)) {
      userLibrary.forEach(book => {
        if (book && book.id) {
          bookCounts[book.id] = (bookCounts[book.id] || 0) + 1;
        }
      });
    }

    // Znalezienie najpopularniejszej książki
    let mostPopularBook = null;
    let maxCount = 0;
    
    books.forEach(book => {
      if (book && book.id && bookCounts[book.id] > maxCount) {
        mostPopularBook = book;
        maxCount = bookCounts[book.id];
      }
    });

    setStats({
      totalBooks: books.length,
      booksWithContent,
      booksInLibraries: Object.keys(bookCounts).length,
      mostPopular: maxCount > 0 ? { book: mostPopularBook, count: maxCount } : null
    });
  }, [books, userLibrary]);

  return (
    <div className="admin-section">
      <h2>Statystyki książek</h2>
      <div className="stats-container">
        <div className="stat-box">
          <div className="stat-value">{stats.totalBooks}</div>
          <div className="stat-label">Wszystkich książek</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-value">{stats.booksWithContent}</div>
          <div className="stat-label">Książek z treścią</div>
        </div>
        
        <div className="stat-box">
          <div className="stat-value">{stats.booksInLibraries}</div>
          <div className="stat-label">Książek w bibliotekach</div>
        </div>

        {stats.mostPopular && (
          <div className="stat-box popular-book">
            <div className="stat-label">Najpopularniejsza książka:</div>
            <div className="book-title">{stats.mostPopular.book.title}</div>
            <div className="book-author">Autor: {stats.mostPopular.book.author}</div>
            <div className="stat-value">
              Dodana do {stats.mostPopular.count} {stats.mostPopular.count === 1 ? 'biblioteki' : 
                stats.mostPopular.count < 5 ? 'bibliotek' : 'bibliotek'}
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default BookStats; 