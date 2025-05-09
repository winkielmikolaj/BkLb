import React, { createContext, useState, useContext } from 'react';

const AuthContext = createContext();

export const useAuth = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [isRegistering, setIsRegistering] = useState(false);
  const [error, setError] = useState('');
  const [currentUser, setCurrentUser] = useState(null);

  // Loguje użytkownika
  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('http://localhost:3000/api/users/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      return;
    }

    setCurrentUser(data.user);
    setIsLoggedIn(true);
    setUsername('');
    setPassword('');
  };

  // Rejestruje użytkownika
  const handleRegister = async (e) => {
    e.preventDefault();
    setError('');

    const response = await fetch('http://localhost:3000/api/users/register', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ username, password }),
    });

    const data = await response.json();
    if (!response.ok) {
      setError(data.error);
      return;
    }

    setIsRegistering(false);
    setUsername('');
    setPassword('');
    alert('Rejestracja udana! Możesz się teraz zalogować.');
  };

  const logout = () => {
    setIsLoggedIn(false);
    setCurrentUser(null);
  };

  const value = {
    username,
    setUsername,
    password,
    setPassword,
    isLoggedIn,
    setIsLoggedIn,
    isRegistering,
    setIsRegistering,
    error,
    setError,
    currentUser,
    setCurrentUser,
    handleLogin,
    handleRegister,
    logout
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}; 