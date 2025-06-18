import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthContainer } from './components/auth/AuthContainer';
import { GamePage } from './components/game-page/GamePage';
import './styles/Common.css';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center">
        <div className="loading-spinner w-10 h-10"></div>
      </div>
    );
  }

  return (
    <div className="BitPredict">
      {user ? <GamePage /> : <AuthContainer />}
    </div>
  );
}

function App() {
  return (
    <AuthProvider>
      <AppContent />
    </AuthProvider>
  );
}

export default App;
