import React from 'react';
import BooksList from '../books/BooksList';
import BookDetails from '../books/BookDetails';

const MainPage = () => {
  return (
    <div className="app-container">
      <h1>Lista książek</h1>
      <BooksList />
      <BookDetails />
    </div>
  );
};

export default MainPage; 