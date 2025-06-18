import React, { useState } from 'react';
import { LoginForm } from './LoginForm';
import { RegisterForm } from './RegisterForm';
import { useAuth } from '../../contexts/AuthContext';
import './AuthComponents.css';

export const AuthContainer: React.FC = () => {
  const [isLoginMode, setIsLoginMode] = useState(true);
  const { login, register, loading, error, clearError } = useAuth();

  const toggleMode = () => {
    clearError(); // Form değiştiğinde hataları temizle
    setIsLoginMode(!isLoginMode);
  };

  return (
      <div className="w-full mx-auto">
        {isLoginMode ? (
          <LoginForm
            onSubmit={login}
            loading={loading}
            error={error}
            onToggleForm={toggleMode}
          />
        ) : (
          <RegisterForm
            onSubmit={register}
            loading={loading}
            error={error}
            onToggleForm={toggleMode}
          />
        )}
      </div>
  );
}; 