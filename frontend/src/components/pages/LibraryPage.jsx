import React from 'react';
import UserLibrary from '../books/UserLibrary';
import BookDetails from '../books/BookDetails';

const LibraryPage = () => {
  return (
    <div className="app-container">
      <h1>Moja biblioteka</h1>
      <UserLibrary />
      <BookDetails />
    </div>
  );
};

export default LibraryPage; 