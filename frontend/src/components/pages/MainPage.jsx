import React, { useEffect } from 'react';
import BooksList from '../books/BooksList';
import BookDetails from '../books/BookDetails';
import SearchBar from '../common/SearchBar';
import { useBooks } from '../../contexts/BooksContext';
import { RiBookLine } from 'react-icons/ri';

const MainPage = () => {
  const { selectedBook, setActiveView, searchTerm, filteredBooks } = useBooks();
  
  useEffect(() => {
    setActiveView('catalog');
  }, [setActiveView]);
  
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Wszystkie książki</h1>
        <p className="page-description">
          Przeglądaj naszą kolekcję dostępnych książek. Kliknij na książkę, aby zobaczyć szczegóły.
        </p>
      </div>
      
      <SearchBar placeholder="Szukaj po tytule lub autorze..." />
      
      {searchTerm && filteredBooks && (
        <div className="search-results-count">
          {filteredBooks.length === 0 
            ? 'Nie znaleziono książek spełniających kryteria wyszukiwania.' 
            : `Znaleziono ${filteredBooks.length} ${
                filteredBooks.length === 1 ? 'książkę' : 
                filteredBooks.length < 5 ? 'książki' : 'książek'
              }`
          }
        </div>
      )}
      
      <BooksList />
      
      {selectedBook && <BookDetails />}
    </div>
  );
};

export default MainPage; 