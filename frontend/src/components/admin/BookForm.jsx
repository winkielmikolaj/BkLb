import React from 'react';
import { useBooks } from '../../contexts/BooksContext';
import { RiSaveLine, RiAddLine, RiCloseLine } from 'react-icons/ri';

const BookForm = () => {
  const { 
    title, 
    setTitle, 
    author, 
    setAuthor, 
    content, 
    setContent, 
    isEditing, 
    handleAddBook, 
    handleEditBook,
    setIsEditing,
    setSelectedBook
  } = useBooks();

  const handleCancel = () => {
    setIsEditing(false);
    setSelectedBook(null);
    setTitle('');
    setAuthor('');
    setContent('');
  };

  return (
    <>
      <h2 className="form-title">{isEditing ? 'Edytuj książkę' : 'Dodaj nową książkę'}</h2>
      <form className="form-container" onSubmit={isEditing ? handleEditBook : handleAddBook}>
        <div className="form-row">
          <div className="form-field">
            <label className="form-label" htmlFor="title">Tytuł</label>
            <input
              className="form-input"
              type="text"
              id="title"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
          </div>
          <div className="form-field">
            <label className="form-label" htmlFor="author">Autor</label>
            <input
              className="form-input"
              type="text"
              id="author"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
          </div>
        </div>
        
        <div className="form-field">
          <label className="form-label" htmlFor="content">Treść książki</label>
          <textarea
            className="content-input"
            id="content"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows="10"
          />
        </div>
        
        <div className="form-buttons">
          {isEditing && (
            <button
              className="btn btn-secondary"
              type="button"
              onClick={handleCancel}
            >
              <RiCloseLine />
              <span>Anuluj</span>
            </button>
          )}
          
          <button className={`btn ${isEditing ? 'btn-warning' : 'btn-success'}`} type="submit">
            {isEditing ? (
              <>
                <RiSaveLine />
                <span>Zapisz zmiany</span>
              </>
            ) : (
              <>
                <RiAddLine />
                <span>Dodaj książkę</span>
              </>
            )}
          </button>
        </div>
      </form>
    </>
  );
};

export default BookForm; 