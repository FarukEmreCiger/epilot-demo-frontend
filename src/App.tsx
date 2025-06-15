import React from 'react';
import { useAuth } from './hooks/useAuth';
import { AuthContainer } from './components/auth/AuthContainer';
import { Dashboard } from './components/dashboard/Dashboard';
import './styles/components.css';

function App() {
  const { user, loading } = useAuth();

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-800 text-white flex flex-col justify-center items-center">
        <div className="loading-spinner w-10 h-10"></div>
        <p className="mt-5 text-lg">
          Loading...
        </p>
      </div>
    );
  }

  return (
    <div className="App">
      {user ? <Dashboard /> : <AuthContainer />}
    </div>
  );
}

export default App;
