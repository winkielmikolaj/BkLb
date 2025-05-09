import React, { useEffect, useState } from 'react';
import './App.css';

// Główny komponent aplikacji
function App() {
  const [books, setBooks] = useState([]);
  const [userLibrary, setUserLibrary] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(300);
  const [activePage, setActivePage] = useState('main'); // przelaczanie miedzy stronami

  // Dzieli tekst na strony
  const splitContentIntoPages = (text) => {
    if (!text) return [];
    const words = text.split(/\s+/);
    const pages = [];
    for (let i = 0; i < words.length; i += wordsPerPage) {
      pages.push(words.slice(i, i + wordsPerPage).join(' '));
    }
    return pages;
  };

  // Pobiera listę książek
  const fetchBooks = async () => {
    const response = await fetch('http://localhost:3000/api/books');
    if (!response.ok) {
      console.error('Failed to fetch books:', response.statusText);
      return alert('Nie udało się pobrać książek');
    }
    const data = await response.json();
    setBooks(data);
  };

  // Pobiera bibliotekę użytkownika
  const fetchUserLibrary = async () => {
    if (!currentUser) return;
    
    try {
      const response = await fetch(`http://localhost:3000/api/users/${currentUser.id}/library`);
      if (!response.ok) {
        throw new Error('Failed to fetch user library');
      }
      const data = await response.json();
      setUserLibrary(data);
    } catch (error) {
      console.error('Error fetching user library:', error);
      alert('Nie udało się pobrać biblioteki użytkownika');
    }
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchBooks();
      fetchUserLibrary();
    }
  }, [isLoggedIn]);

  // Reset paginacji przy zmianie książki
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBook]);

  // Dodaje nową książkę
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title || !author) {
      return alert('Tytuł i autor są wymagane');
    }

    const response = await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author, content, userId: currentUser.id }),
    });

    if (!response.ok) {
      const data = await response.json();
      return alert(data.error || 'Nie udało się dodać książki');
    }

    const newBook = await response.json();
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
    setContent('');
  };

  // Usuwa książkę
  const handleDeleteBook = async (id) => {
    const response = await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ userId: currentUser.id }),
    });

    if (!response.ok) {
      const data = await response.json();
      return alert(data.error || 'Nie udało się usunąć książki');
    }

    setBooks(books.filter((book) => book.id !== id));
    if (selectedBook?.id === id) {
      setSelectedBook(null);
    }
  };

  // Edytuje książkę
  const handleEditBook = async (e) => {
    e.preventDefault();
    if (!selectedBook) return;

    const response = await fetch(`http://localhost:3000/api/books/${selectedBook.id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        title,
        author,
        content,
        userId: currentUser.id
      }),
    });

    if (!response.ok) {
      const data = await response.json();
      return alert(data.error || 'Nie udało się zaktualizować książki');
    }

    const updatedBook = await response.json();
    setBooks(books.map(book => book.id === updatedBook.id ? updatedBook : book));
    setSelectedBook(updatedBook);
    setIsEditing(false);
  };

  // Rozpoczyna edycję książki
  const startEditing = (book) => {
    setSelectedBook(book);
    setTitle(book.title);
    setAuthor(book.author);
    setContent(book.content || '');
    setIsEditing(true);
  };

  // Loguje użytkownika
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      return;
    }

    setCurrentUser(data.user);
    setIsLoggedIn(true);
    setUsername('');
    setPassword('');
  };

  // Rejestruje użytkownika
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      return;
    }

    setIsRegistering(false);
    setUsername('');
    setPassword('');
    alert('Rejestracja udana! Możesz się teraz zalogować.');
  };

  // Dodaje książkę do biblioteki
  const handleAddToLibrary = async (bookId) => {
    if (!currentUser) return;

    try {
      const response = await fetch(`http://localhost:3000/api/users/${currentUser.id}/library`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ bookId }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Nie udało się dodać książki do biblioteki');
      }

      await fetchUserLibrary();
      alert('Książka została dodana do biblioteki!');
    } catch (error) {
      console.error('Error adding book to library:', error);
      alert(error.message);
    }
  };

  // Usuwa książkę z biblioteki
  const handleRemoveFromLibrary = async (bookId) => {
    if (!currentUser) return;

    try {
      const response = await fetch(`http://localhost:3000/api/users/${currentUser.id}/library/${bookId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Nie udało się usunąć książki z biblioteki');
      }

      await fetchUserLibrary();
      alert('Książka została usunięta z biblioteki!');
    } catch (error) {
      console.error('Error removing book from library:', error);
      alert(error.message);
    }
  };

  // Odśwież bibliotekę przy zmianie użytkownika
  useEffect(() => {
    if (currentUser) {
      fetchUserLibrary();
    }
  }, [currentUser]);

  // Odśwież bibliotekę przy zmianie aktywnej strony
  useEffect(() => {
    if (activePage === 'library') {
      fetchUserLibrary();
    }
  }, [activePage]);

  if (!isLoggedIn) {
    return (
      <div className="auth-container">
        <h1 className="auth-title">{isRegistering ? 'Rejestracja' : 'Logowanie'}</h1>
        {error && <div className="auth-error">{error}</div>}
        <form className="auth-form" onSubmit={isRegistering ? handleRegister : handleLogin}>
          <input
            className="auth-input"
            type="text"
            placeholder="Nazwa użytkownika"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
          <input
            className="auth-input"
            type="password"
            placeholder="Hasło"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <button className="auth-button" type="submit">
            {isRegistering ? 'Zarejestruj' : 'Zaloguj'}
          </button>
        </form>
        <div className="auth-switch">
          <button
            className="auth-switch-button"
            onClick={() => setIsRegistering(!isRegistering)}
          >
            {isRegistering ? 'Przejdź do logowania' : 'Przejdź do rejestracji'}
          </button>
        </div>
      </div>
    );
  }

  const contentPages = selectedBook ? splitContentIntoPages(selectedBook.content) : [];
  const totalPages = contentPages.length;

  // Renderuje główną stronę
  const renderMainPage = () => (
    <div className="app-container">
      <h1>Lista książek</h1>
      <div className="books-grid">
        {books.map((book) => (
          <div 
            key={book.id} 
            className="book-tile"
            onClick={() => setSelectedBook(book)}
          >
            <div className="book-image-placeholder">
              <div className="book-image-text">{book.title.charAt(0)}</div>
            </div>
            <div className="book-tile-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              {book.content && <span className="has-content">✓</span>}
              <div className="book-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className={userLibrary.some(libBook => libBook.id === book.id) ? 'remove-from-library-button' : 'add-to-library-button'}
                  onClick={() => userLibrary.some(libBook => libBook.id === book.id) ? handleRemoveFromLibrary(book.id) : handleAddToLibrary(book.id)}
                >
                  {userLibrary.some(libBook => libBook.id === book.id) ? 'Usuń z biblioteki' : 'Dodaj do biblioteki'}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="book-details">
          <h2>{selectedBook.title}</h2>
          <p className="book-author">Autor: {selectedBook.author}</p>
          {selectedBook.content && (
            <div className="book-content">
              <h3>Treść:</h3>
              <div className="book-page">
                <p>{contentPages[currentPage - 1]}</p>
              </div>
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-button"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Poprzednia
                  </button>
                  <span className="page-info">
                    Strona {currentPage} z {totalPages}
                  </span>
                  <button
                    className="page-button"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Następna
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Renderuje stronę biblioteki
  const renderLibraryPage = () => (
    <div className="app-container">
      <h1>Moja biblioteka</h1>
      <div className="books-grid">
        {userLibrary.map((book) => (
          <div 
            key={book.id} 
            className="book-tile"
            onClick={() => setSelectedBook(book)}
          >
            <div className="book-image-placeholder">
              <div className="book-image-text">{book.title.charAt(0)}</div>
            </div>
            <div className="book-tile-info">
              <h3 className="book-title">{book.title}</h3>
              <p className="book-author">{book.author}</p>
              {book.content && <span className="has-content">✓</span>}
              <div className="book-actions" onClick={(e) => e.stopPropagation()}>
                <button
                  className="remove-from-library-button"
                  onClick={() => handleRemoveFromLibrary(book.id)}
                >
                  Usuń z biblioteki
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>

      {selectedBook && (
        <div className="book-details">
          <h2>{selectedBook.title}</h2>
          <p className="book-author">Autor: {selectedBook.author}</p>
          {selectedBook.content && (
            <div className="book-content">
              <h3>Treść:</h3>
              <div className="book-page">
                <p>{contentPages[currentPage - 1]}</p>
              </div>
              {totalPages > 1 && (
                <div className="pagination">
                  <button
                    className="page-button"
                    onClick={() => setCurrentPage(prev => Math.max(1, prev - 1))}
                    disabled={currentPage === 1}
                  >
                    Poprzednia
                  </button>
                  <span className="page-info">
                    Strona {currentPage} z {totalPages}
                  </span>
                  <button
                    className="page-button"
                    onClick={() => setCurrentPage(prev => Math.min(totalPages, prev + 1))}
                    disabled={currentPage === totalPages}
                  >
                    Następna
                  </button>
                </div>
              )}
            </div>
          )}
        </div>
      )}
    </div>
  );

  // Renderuje panel administratora
  const renderAdminPage = () => {
    if (currentUser?.role !== 'admin') {
      return (
        <div className="app-container">
          <h1>Brak dostępu</h1>
          <p>Nie masz uprawnień do wyświetlenia tej strony.</p>
        </div>
      );
    }

    return (
      <div className="app-container">
        <h1>Panel administratora</h1>
        
        <div className="admin-section">
          <h2>{isEditing ? 'Edytuj książkę' : 'Dodaj książkę'}</h2>
          <form className="book-form" onSubmit={isEditing ? handleEditBook : handleAddBook}>
            <input
              className="auth-input"
              type="text"
              id="title"
              placeholder="Tytuł"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              required
            />
            <input
              className="auth-input"
              type="text"
              id="author"
              placeholder="Autor"
              value={author}
              onChange={(e) => setAuthor(e.target.value)}
              required
            />
            <textarea
              className="content-input"
              placeholder="Treść książki"
              value={content}
              onChange={(e) => setContent(e.target.value)}
              rows="5"
            />
            <div className="form-buttons">
              <button className="add-button" type="submit">
                {isEditing ? 'Zapisz zmiany' : 'Dodaj'}
              </button>
              {isEditing && (
                <button
                  className="cancel-button"
                  type="button"
                  onClick={() => {
                    setIsEditing(false);
                    setSelectedBook(null);
                    setTitle('');
                    setAuthor('');
                    setContent('');
                  }}
                >
                  Anuluj
                </button>
              )}
            </div>
          </form>
        </div>

        <div className="admin-section">
          <h2>Zarządzanie książkami</h2>
          <div className="admin-books-list">
            {books.map((book) => (
              <div key={book.id} className="admin-book-item">
                <div className="admin-book-info">
                  <h3>{book.title}</h3>
                  <p>Autor: {book.author}</p>
                </div>
                <div className="admin-book-actions">
                  <button
                    className="edit-button"
                    onClick={() => startEditing(book)}
                  >
                    Edytuj
                  </button>
                  <button
                    className="delete-button"
                    onClick={() => handleDeleteBook(book.id)}
                  >
                    Usuń
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    );
  };

  return (
    <>
      <div className="container">
        <div className="user-info">
          Zalogowany jako: {currentUser?.username} ({currentUser?.role})
        </div>
        <div className="navigation">
          <button 
            className={`nav-button ${activePage === 'main' ? 'active' : ''}`}
            onClick={() => setActivePage('main')}
          >
            Wszystkie książki
          </button>
          <button 
            className={`nav-button ${activePage === 'library' ? 'active' : ''}`}
            onClick={() => setActivePage('library')}
          >
            Moja biblioteka
          </button>
          {currentUser?.role === 'admin' && (
            <button 
              className={`nav-button ${activePage === 'admin' ? 'active' : ''}`}
              onClick={() => setActivePage('admin')}
            >
              Panel administratora
            </button>
          )}
        </div>
        <button className="logout-button" onClick={() => setIsLoggedIn(false)}>
          Wyloguj
        </button>
      </div>
      {activePage === 'main' ? renderMainPage() : 
       activePage === 'library' ? renderLibraryPage() : 
       renderAdminPage()}
    </>
  );
}

export default App;
