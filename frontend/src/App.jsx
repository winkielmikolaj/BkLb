import React, { useState } from 'react';
import './App.css';
import { useAuth } from './contexts/AuthContext';
import Navigation from './components/layout/Navigation';
import MainPage from './components/pages/MainPage';
import LibraryPage from './components/pages/LibraryPage';
import AdminPage from './components/pages/AdminPage';
import AuthContainer from './components/auth/AuthContainer';

// Główny komponent aplikacji
function App() {
  const { isLoggedIn } = useAuth();
  const [activePage, setActivePage] = useState('main');

  const renderActivePage = () => {
    switch (activePage) {
      case 'main':
        return <MainPage />;
      case 'library':
        return <LibraryPage />;
      case 'admin':
        return <AdminPage />;
      default:
        return <MainPage />;
    }
  };

  if (!isLoggedIn) {
    return <div className="app-wrapper fade-in"><AuthContainer /></div>;
  }

  return (
    <div className="app-wrapper">
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      <main className="page-container fade-in">
        {renderActivePage()}
      </main>
    </div>
  );
}

export default App;