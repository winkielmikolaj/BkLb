import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import { RiUser3Line, RiLockPasswordLine, RiUserAddLine, RiLoginBoxLine } from 'react-icons/ri';

const RegisterForm = () => {
  const { username, setUsername, password, setPassword, error, handleRegister, setIsRegistering } = useAuth();

  return (
    <div className="auth-container">
      <h1 className="auth-title">Załóż konto w BookLib</h1>
      {error && <div className="auth-error">{error}</div>}
      <form className="auth-form" onSubmit={handleRegister}>
        <div className="form-group">
          <label className="form-label" htmlFor="username">Nazwa użytkownika</label>
          <div className="input-with-icon">
            <RiUser3Line />
            <input
              id="username"
              className="auth-input"
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
        </div>
        <div className="form-group">
          <label className="form-label" htmlFor="password">Hasło</label>
          <div className="input-with-icon">
            <RiLockPasswordLine />
            <input
              id="password"
              className="auth-input"
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
        </div>
        <button className="auth-button" type="submit">
          <RiUserAddLine />
          <span>Zarejestruj się</span>
        </button>
      </form>
      <div className="auth-switch">
        Masz już konto?
        <button
          className="auth-switch-button"
          onClick={() => setIsRegistering(false)}
        >
          <RiLoginBoxLine />
          <span>Zaloguj się</span>
        </button>
      </div>
    </div>
  );
};

export default RegisterForm; 