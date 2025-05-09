import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import BookForm from '../admin/BookForm';
import AdminBooksList from '../admin/BooksList';

const AdminPage = () => {
  const { currentUser } = useAuth();

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
      <BookForm />
      <AdminBooksList />
    </div>
  );
};

export default AdminPage; 