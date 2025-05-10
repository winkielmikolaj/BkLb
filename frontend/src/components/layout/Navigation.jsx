import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { RiBookLine, RiBookmarkLine, RiDashboardLine, RiLogoutBoxLine, RiBookReadLine, RiMenuLine, RiCloseLine } from 'react-icons/ri';

const Navigation = ({ activePage, setActivePage }) => {
  const { currentUser, logout } = useAuth();
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  
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

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const handleNavClick = (page) => {
    setActivePage(page);
    setIsMenuOpen(false);
  };

  return (
    <nav className="navigation">
      <div className="container nav-container">
        <div className="logo">
          <RiBookReadLine className="logo-icon" />
          <span>BookLib</span>
        </div>
        
        <button className="menu-toggle" onClick={toggleMenu}>
          {isMenuOpen ? <RiCloseLine /> : <RiMenuLine />}
        </button>

        <div className={`nav-content ${isMenuOpen ? 'active' : ''}`}>
          <div className="nav-buttons">
            <button 
              className={`nav-button ${activePage === 'main' ? 'active' : ''}`}
              onClick={() => handleNavClick('main')}
            >
              <RiBookLine />
              <span>Wszystkie książki</span>
            </button>
            <button 
              className={`nav-button ${activePage === 'library' ? 'active' : ''}`}
              onClick={() => handleNavClick('library')}
            >
              <RiBookmarkLine />
              <span>Moja biblioteka</span>
            </button>
            {currentUser?.role === 'admin' && (
              <button 
                className={`nav-button ${activePage === 'admin' ? 'active' : ''}`}
                onClick={() => handleNavClick('admin')}
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
      </div>
    </nav>
  );
};

export default Navigation; 