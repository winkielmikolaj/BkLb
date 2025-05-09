import React, { createContext, useState, useContext, useEffect } from 'react';
import { useAuth } from './AuthContext';

const BooksContext = createContext();

export const useBooks = () => useContext(BooksContext);

export const BooksProvider = ({ children }) => {
  const [books, setBooks] = useState([]);
  const [userLibrary, setUserLibrary] = useState([]);
  const [allFavorites, setAllFavorites] = useState([]);
  const [title, setTitle] = useState('');
  const [author, setAuthor] = useState('');
  const [content, setContent] = useState('');
  
  // Separate book selection for different views
  const [selectedBook, setSelectedBook] = useState(null); // For catalog view
  const [selectedLibraryBook, setSelectedLibraryBook] = useState(null); // For library view
  const [activeView, setActiveView] = useState('catalog'); // 'catalog' or 'library'
  
  const [isEditing, setIsEditing] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);
  const [currentLibraryPage, setCurrentLibraryPage] = useState(1);
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
  
  // Pobiera ulubione książki wszystkich użytkowników
  const fetchAllFavorites = async () => {
    try {
      const response = await fetch('http://localhost:3000/api/users/stats/favorites');
      if (!response.ok) {
        throw new Error('Failed to fetch favorite books');
      }
      const data = await response.json();
      setAllFavorites(data);
    } catch (error) {
      console.error('Error fetching all favorites:', error);
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
    if (selectedLibraryBook?.id === id) {
      setSelectedLibraryBook(null);
    }
    
    // Odświeżenie statystyk
    fetchAllFavorites();
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
    
    // Aktualizacja książki w bibliotece, jeśli tam jest
    if (selectedLibraryBook?.id === updatedBook.id) {
      setSelectedLibraryBook(updatedBook);
    }
    
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
      await fetchAllFavorites(); // Odświeżenie statystyk po dodaniu do biblioteki
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

      // If the removed book was selected in the library view, deselect it
      if (selectedLibraryBook?.id === bookId) {
        setSelectedLibraryBook(null);
      }

      await fetchUserLibrary();
      await fetchAllFavorites(); // Odświeżenie statystyk po usunięciu z biblioteki
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
      fetchAllFavorites();
    }
  }, [isLoggedIn, currentUser]);

  // Reset paginacji przy zmianie książki w katalogu
  useEffect(() => {
    setCurrentPage(1);
  }, [selectedBook]);
  
  // Reset paginacji przy zmianie książki w bibliotece
  useEffect(() => {
    setCurrentLibraryPage(1);
  }, [selectedLibraryBook]);

  // Helper functions for current view
  const getCurrentSelectedBook = () => {
    return activeView === 'library' ? selectedLibraryBook : selectedBook;
  };
  
  const getCurrentPage = () => {
    return activeView === 'library' ? currentLibraryPage : currentPage;
  };
  
  const setCurrentViewPage = (page) => {
    if (activeView === 'library') {
      setCurrentLibraryPage(page);
    } else {
      setCurrentPage(page);
    }
  };

  const value = {
    books,
    userLibrary,
    allFavorites,
    title,
    setTitle,
    author,
    setAuthor,
    content,
    setContent,
    selectedBook,
    setSelectedBook,
    selectedLibraryBook,
    setSelectedLibraryBook,
    activeView,
    setActiveView,
    isEditing,
    setIsEditing,
    currentPage,
    setCurrentPage,
    currentLibraryPage,
    setCurrentLibraryPage,
    wordsPerPage,
    splitContentIntoPages,
    fetchBooks,
    fetchUserLibrary,
    fetchAllFavorites,
    handleAddBook,
    handleDeleteBook,
    handleEditBook,
    startEditing,
    handleAddToLibrary,
    handleRemoveFromLibrary,
    // Helpers for current view
    getCurrentSelectedBook,
    getCurrentPage,
    setCurrentViewPage
  };

  return <BooksContext.Provider value={value}>{children}</BooksContext.Provider>;
}; 