import React, { useEffect, useState } from 'react';

function App() {
  const [books, setBooks] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');

  // Funkcja do pobierania książek
  const fetchBooks = async () => {
    const response = await fetch('http://localhost:3000/api/books');
    const data = await response.json();
    setBooks(data);
  };

  useEffect(() => {
    fetchBooks(); // Po załadowaniu komponentu pobieramy książki
  }, []);

  // Funkcja dodająca książkę
  const handleAddBook = async (e) => {
    e.preventDefault();
  
    if (!title || !author) {
      return alert('Tytuł i autor są wymagane');
    }
  
    console.log('Sending request to add book:', { title, author });
  
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
    console.log('Book added successfully:', newBook);
  
    setBooks([...books, newBook]);
    setTitle('');
    setAuthor('');
  };

  // Funkcja usuwająca książkę
  const handleDeleteBook = async (id) => {
    await fetch(`http://localhost:3000/api/books/${id}`, {
      method: 'DELETE',
    });

    setBooks(books.filter((book) => book.id !== id));  // Usuwamy książkę z listy
  };

  return (
    <div style={{ padding: '1rem' }}>
      <h1>Lista książek oooooooooooo</h1>
      <ul id="bookList">
        {books.map((book) => (
          <li key={book.id}>
            {book.title} by {book.author}
            <button onClick={() => handleDeleteBook(book.id)}>Usuń</button>
          </li>
        ))}
      </ul>

      <h2>Dodaj książkę</h2>
      <form onSubmit={handleAddBook}>
        <input
          type="text"
          id="title"
          placeholder="Tytuł"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
        <input
          type="text"
          id="author"
          placeholder="Autor"
          value={author}
          onChange={(e) => setAuthor(e.target.value)}
          required
        />
        <button type="submit">Dodaj</button>
      </form>
    </div>
  );
}

export default App;
