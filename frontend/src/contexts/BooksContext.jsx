import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [userLibrary, setUserLibrary] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  const [selectedBook, setSelectedBook] = useState(null);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [wordsPerPage] = useState(300);
  
  const { currentUser, isLoggedIn } = useAuth();
  
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

  // Fetch books when logged in
  useEffect(() => {
    if (isLoggedIn) {
      fetchBooks();
      fetchUserLibrary();
    }
  }, [isLoggedIn, currentUser]);

  // Reset paginacji przy zmianie książki
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBook]);

  const value = {
    books,
    userLibrary,
    title,
    setTitle,
    author,
    setAuthor,
    content,
    setContent,
    selectedBook,
    setSelectedBook,
    isEditing,
    setIsEditing,
    currentPage,
    setCurrentPage,
    wordsPerPage,
    splitContentIntoPages,
    fetchBooks,
    fetchUserLibrary,
    handleAddBook,
    handleDeleteBook,
    handleEditBook,
    startEditing,
    handleAddToLibrary,
    handleRemoveFromLibrary
  };

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
}; 