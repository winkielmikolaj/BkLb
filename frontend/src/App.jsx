import React, { useEffect, useState } from 'react';
import './App.css';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');

  // Funkcja do pobierania książek
  const fetchBooks = async () => {
    const response = await fetch('http://localhost:3000/api/books');
    if (!response.ok) {
      console.error('Failed to fetch books:', response.statusText);
      return alert('Nie udało się pobrać książek');
    }
    const data = await response.json();
    setBooks(data);
  };

  useEffect(() => {
    if (isLoggedIn) {
      fetchBooks();
    }
  }, [isLoggedIn]);

  // Funkcja dodająca książkę
  const handleAddBook = async (e) => {
    e.preventDefault();
    if (!title || !author) {
      return alert('Tytuł i autor są wymagane');
    }

    const response = await fetch('http://localhost:3000/api/books', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ title, author }),
    });

    if (!response.ok) {
      console.error('Failed to add book:', response.statusText);
      return alert('Nie udało się dodać książki');
    }

    const newBook = await response.json();
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
  };

  // Funkcja usuwająca książkę
  const handleDeleteBook = async (id) => {
    await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE',
    });
    setBooks(books.filter((book) => book.id !== id));
  };

  // Funkcja logowania
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

    setIsLoggedIn(true);
    setUsername('');
    setPassword('');
  };

  // Funkcja rejestracji
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

  return (
    <div className="app-container">
      <h1>Lista książek</h1>
      <button className="logout-button" onClick={() => setIsLoggedIn(false)}>
        Wyloguj
      </button>
      <ul className="book-list">
        {books.map((book) => (
          <li key={book.id} className="book-item">
            <span>
              {book.title} by {book.author}
            </span>
            <button
              className="delete-button"
              onClick={() => handleDeleteBook(book.id)}
            >
              Usuń
            </button>
          </li>
        ))}
      </ul>

      <h2>Dodaj książkę</h2>
      <form className="book-form" onSubmit={handleAddBook}>
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
        <button className="add-button" type="submit">
          Dodaj
        </button>
      </form>
    </div>
  );
}

export default App;
