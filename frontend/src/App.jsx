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

  if (!isLoggedIn) {
    return <AuthContainer />;
  }

  return (
    <>
      <Navigation activePage={activePage} setActivePage={setActivePage} />
      
      {activePage === 'main' ? <MainPage /> : 
       activePage === 'library' ? <LibraryPage /> : 
       <AdminPage />}
    </>
  );
}

export default App;