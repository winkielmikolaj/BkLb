import React from 'react';
import { useAuth } from '../../contexts/AuthContext';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';

const AuthContainer = () => {
  const { isRegistering } = useAuth();

  return isRegistering ? <RegisterForm /> : <LoginForm />;
};

export default AuthContainer; 