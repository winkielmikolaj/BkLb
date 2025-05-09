import React from 'react';
import { useAuth } from '../../contexts/AuthContext';

const LoginForm = () => {
  const { username, setUsername, password, setPassword, error, handleLogin, isRegistering, setIsRegistering } = useAuth();

  return (
    <div className="auth-container">
      <h1 className="auth-title">Logowanie</h1>
      {error && <div className="auth-error">{error}</div>}
      <form className="auth-form" onSubmit={handleLogin}>
        <input
          className="auth-input"
          type="text"
          placeholder="Nazwa użytkownika"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          required
        />
        <input
          className="auth-input"
          type="password"
          placeholder="Hasło"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          required
        />
        <button className="auth-button" type="submit">
          Zaloguj
        </button>
      </form>
      <div className="auth-switch">
        <button
          className="auth-switch-button"
          onClick={() => setIsRegistering(true)}
        >
          Przejdź do rejestracji
        </button>
      </div>
    </div>
  );
};

export default LoginForm; 