import React from 'react';
import { AuthProvider, useAuth } from './contexts/AuthContext';
import { AuthContainer } from './components/auth/AuthContainer';
import { GamePage } from './components/game-page/GamePage';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
import './styles/Common.css';
import { Header } from './components/game-page/header/Header';
import { HistoryPage } from './components/history/HistoryPage';

function AppContent() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center">
        <div className="loading-spinner w-10 h-10"></div>
      </div>
    );
  }

  if (!user) {
    return <AuthContainer />;
  }

  return (
    <>
    <Header loading={loading} />
    <Routes>
      <Route path="/" element={<GamePage />} />
      <Route path="/history" element={<HistoryPage />} />
      <Route path="*" element={<Navigate to="/" replace />} />
    </Routes>
    </>
    
  );
}

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppContent />
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
