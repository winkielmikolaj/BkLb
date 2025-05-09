import React, { useState } from 'react';
import { useAuth } from '../../contexts/AuthContext';
import BookForm from '../admin/BookForm';
import AdminBooksList from '../admin/BooksList';
import BookStats from '../admin/BookStats';

const AdminPage = () => {
  const { currentUser } = useAuth();
  const [activeTab, setActiveTab] = useState('add');

  if (currentUser?.role !== 'admin') {
    return (
      <div className="app-container">
        <h1>Brak dostępu</h1>
        <p>Nie masz uprawnień do wyświetlenia tej strony.</p>
      </div>
    );
  }

  return (
    <div className="app-container">
      <h1>Panel administratora</h1>
      
      <div className="admin-tabs">
        <div 
          className={`admin-tab ${activeTab === 'add' ? 'active' : ''}`}
          onClick={() => setActiveTab('add')}
        >
          Dodaj/Edytuj książkę
        </div>
        <div 
          className={`admin-tab ${activeTab === 'manage' ? 'active' : ''}`}
          onClick={() => setActiveTab('manage')}
        >
          Zarządzanie książkami
        </div>
        <div 
          className={`admin-tab ${activeTab === 'stats' ? 'active' : ''}`}
          onClick={() => setActiveTab('stats')}
        >
          Statystyki
        </div>
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