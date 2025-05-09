import React, { useEffect } from 'react';
import UserLibrary from '../books/UserLibrary';
import BookDetails from '../books/BookDetails';
import { useBooks } from '../../contexts/BooksContext';

const LibraryPage = () => {
  const { setActiveView } = useBooks();
  
  useEffect(() => {
    setActiveView('library');
  }, [setActiveView]);
  
  return (
    <div className="app-container">
      <h1>Moja biblioteka</h1>
      <UserLibrary />
      <BookDetails />
    </div>
  );
};

export default LibraryPage; 