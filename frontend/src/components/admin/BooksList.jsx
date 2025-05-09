import React from 'react';
import { useBooks } from '../../contexts/BooksContext';
import { RiEditLine, RiDeleteBin7Line, RiBook2Line, RiSearchLine } from 'react-icons/ri';
import SearchBar from '../common/SearchBar';

const AdminBooksList = () => {
  const { books, filteredBooks, searchTerm, startEditing, handleDeleteBook } = useBooks();
  
  // Używamy filteredBooks, jeśli jest searchTerm, w przeciwnym razie books
  const displayBooks = searchTerm ? filteredBooks : books;

  return (
    <>
      <h2 className="form-title">Zarządzanie książkami</h2>
      
      <SearchBar placeholder="Szukaj książki do zarządzania..." />
      
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
      
      {displayBooks.length === 0 ? (
        <p className="text-center">Brak dostępnych książek.</p>
      ) : (
        <div className="admin-books-list">
          {displayBooks.map((book) => (
            <div key={book.id} className="admin-book-item">
              <div className="admin-book-info">
                <h3>{book.title || 'Bez tytułu'}</h3>
                <p>Autor: {book.author || 'Nieznany autor'}</p>
              </div>
              <div className="admin-book-actions">
                <button
                  className="btn btn-warning btn-sm"
                  onClick={() => startEditing(book)}
                >
                  <RiEditLine />
                  <span>Edytuj</span>
                </button>
                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDeleteBook(book.id)}
                >
                  <RiDeleteBin7Line />
                  <span>Usuń</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </>
  );
};

export default AdminBooksList; 