import React, { useState, useEffect } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { useBooks } from '../../contexts/BooksContext';
import BookForm from '../admin/BookForm';
import AdminBooksList from '../admin/BooksList';
import BookStats from '../admin/BookStats';
import { RiAddLine, RiListUnordered, RiBarChartBoxLine } from 'react-icons/ri';

const AdminPage = () => {
  const { currentUser } = useAuth();
  const { setSearchTerm } = useBooks();
  const [activeTab, setActiveTab] = useState('add');

  // Resetujemy wyszukiwanie przy zmianie zakładek
  const handleTabChange = (tab) => {
    setSearchTerm('');
    setActiveTab(tab);
  };

  if (currentUser?.role !== 'admin') {
    return (
      <div className="container">
        <div className="page-header">
          <h1 className="page-title">Brak dostępu</h1>
          <p className="page-description">Nie masz uprawnień do wyświetlenia tej strony.</p>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className="page-header">
        <h1 className="page-title">Panel administratora</h1>
        <p className="page-description">
          Zarządzaj książkami, dodawaj nowe pozycje i przeglądaj statystyki biblioteki.
        </p>
      </div>
      
      <div className="admin-tabs">
        <button 
          className={`admin-tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => handleTabChange('add')}
        >
          <RiAddLine />
          <span>Dodaj/Edytuj książkę</span>
        </button>
        <button 
          className={`admin-tab ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => handleTabChange('manage')}
        >
          <RiListUnordered />
          <span>Zarządzanie książkami</span>
        </button>
        <button 
          className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => handleTabChange('stats')}
        >
          <RiBarChartBoxLine />
          <span>Statystyki</span>
        </button>
      </div>

      <div className="admin-tab-content">
        {activeTab === 'add' && <BookForm />}
        {activeTab === 'manage' && <AdminBooksList />}
        {activeTab === 'stats' && <BookStats />}
      </div>
    </div>
  );
};

export default AdminPage; 