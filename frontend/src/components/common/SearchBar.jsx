import React from 'react';
import { useBooks } from '../../contexts/BooksContext';
import { RiSearchLine, RiCloseLine } from 'react-icons/ri';

const SearchBar = ({ className, placeholder = "Szukaj książek..." }) => {
  const { searchTerm, setSearchTerm } = useBooks();

  const handleClear = () => {
    setSearchTerm('');
  };

  return (
    <div className={`search-bar ${className || ''}`}>
      <div className="search-input-wrapper">
        <RiSearchLine className="search-icon" />
        <input
          type="text"
          className="search-input"
          placeholder={placeholder}
          value={searchTerm}
          onChange={(e) => setSearchTerm(e.target.value)}
        />
        {searchTerm && (
          <button className="search-clear-btn" onClick={handleClear}>
            <RiCloseLine />
          </button>
        )}
      </div>
    </div>
  );
};

export default SearchBar; 