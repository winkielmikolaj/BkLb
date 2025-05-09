import React, { useEffect } from 'react';
import BooksList from '../books/BooksList';
import BookDetails from '../books/BookDetails';
import { useBooks } from '../../contexts/BooksContext';

const MainPage = () => {
  const { setActiveView } = useBooks();
  
  useEffect(() => {
    setActiveView('catalog');
  }, [setActiveView]);
  
  return (
    <div className="app-container">
      <h1>Lista książek</h1>
      <BooksList />
      <BookDetails />
    </div>
  );
};

export default MainPage; 