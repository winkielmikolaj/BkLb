import React, { useEffect } from 'react';
import UserLibrary from '../books/UserLibrary';
import BookDetails from '../books/BookDetails';
import { useBooks } from '../../contexts/BooksContext';
import { RiBookmarkLine } from 'react-icons/ri';

const LibraryPage = () => {
  const { selectedLibraryBook, setActiveView } = useBooks();
  
  useEffect(() => {
    setActiveView('library');
  }, [setActiveView]);
  
  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Moja biblioteka</h1>
        <p className="page-description">
          Tutaj znajdziesz wszystkie książki, które dodałeś do swojej prywatnej biblioteki.
        </p>
      </div>
      
      <UserLibrary />
      
      {selectedLibraryBook && <BookDetails />}
    </div>
  );
};

export default LibraryPage; 