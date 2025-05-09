import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { RiBookLine, RiBookmarkLine, RiDashboardLine, RiLogoutBoxLine, RiBookReadLine } from 'react-icons/ri';

const Navigation = ({ activePage, setActivePage }) => {
  const { currentUser, logout } = useAuth();
  
  // Pobierz inicjały użytkownika do awatara
  const getUserInitials = () => {
    if (!currentUser?.username) return '?';
    return currentUser.username
      .split(' ')
      .map(name => name[0])
      .join('')
      .toUpperCase()
      .substring(0, 2);
  };

  return (
    <nav className="navigation">
      <div className="container nav-container">
        <div className="logo">
          <RiBookReadLine className="logo-icon" />
          <span>BookLib</span>
        </div>
        
        <div className="nav-buttons">
          <button 
            className={`nav-button ${activePage === 'main' ? 'active' : ''}`}
            onClick={() => setActivePage('main')}
          >
            <RiBookLine />
            <span>Wszystkie książki</span>
          </button>
          <button 
            className={`nav-button ${activePage === 'library' ? 'active' : ''}`}
            onClick={() => setActivePage('library')}
          >
            <RiBookmarkLine />
            <span>Moja biblioteka</span>
          </button>
          {currentUser?.role === 'admin' && (
            <button 
              className={`nav-button ${activePage === 'admin' ? 'active' : ''}`}
              onClick={() => setActivePage('admin')}
            >
              <RiDashboardLine />
              <span>Panel administratora</span>
            </button>
          )}
        </div>
        
        <div className="user-controls">
          <div className="user-info">
            <div className="user-avatar">{getUserInitials()}</div>
            <span>{currentUser?.username}</span>
          </div>
          <button className="logout-button" onClick={logout}>
            <RiLogoutBoxLine />
            <span>Wyloguj</span>
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 