import React, { useEffect, useState } from 'react';
import { useBooks } from '../../contexts/BooksContext';
import './BookStats.css';

const BookStats = () => {
  const { books, allFavorites, fetchAllFavorites } = useBooks();
  const [refreshing, setRefreshing] = useState(false);
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
    
    // Znajdowanie najpopularniejszej książki z wszystkich bibliotek
    let mostPopularBook = null;
    
    if (allFavorites && Array.isArray(allFavorites) && allFavorites.length > 0) {
      mostPopularBook = allFavorites[0];
    }

    setStats({
      totalBooks: books.length,
      booksWithContent,
      booksInLibraries: allFavorites.length,
      mostPopular: mostPopularBook ? { 
        book: mostPopularBook, 
        count: mostPopularBook.favorite_count 
      } : null
    });
    
    setRefreshing(false);
  }, [books, allFavorites]);

  const handleRefresh = async () => {
    setRefreshing(true);
    await fetchAllFavorites();
  };

  return (
    <div className="admin-section">
      <div className="stats-header">
        <h2>Statystyki książek</h2>
        <button 
          className="refresh-button" 
          onClick={handleRefresh}
          disabled={refreshing}
        >
          {refreshing ? 'Odświeżanie...' : 'Odśwież dane'}
        </button>
      </div>
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