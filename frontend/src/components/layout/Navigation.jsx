import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const Navigation = ({ activePage, setActivePage }) => {
  const { currentUser, logout } = useAuth();

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
        <button className="logout-button" onClick={logout}>
          Wyloguj
        </button>
      </div>
    </>
  );
};

export default Navigation; 