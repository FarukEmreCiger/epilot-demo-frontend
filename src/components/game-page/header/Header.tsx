import React, { useState } from 'react';
import { useAuth } from '../../../contexts/AuthContext';
import './Header.css';

interface HeaderProps {
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ loading }) => {
  const { user, logout } = useAuth();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
    } catch (error) {
      console.error('Logout error:', error);
    }
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  return (
    <>
      <div className="header-desktop">
        <div className="logo">
          ₿ BitPredict
        </div>

        <div className="user-info">
          {user?.email && (
            <div className="user-welcome">
              <span className="welcome-text">
                Welcome:
              </span>
              <span className="user-email">
                {user.email}
              </span>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            disabled={loading}
            className="logout-btn"
          >
            {loading ? 'Logging out...' : 'Log out'}
          </button>
        </div>
      </div>

      <div className="header-mobile">
        <button
          onClick={toggleDrawer}
          className="menu-btn"
        >
          ☰
        </button>

        <div className="logo-mobile">
          ₿ BitPredict
        </div>

        <div className="spacer"></div>
      </div>

      {isDrawerOpen && (
        <>
          <div
            className="overlay"
            onClick={toggleDrawer}
          />

          <div className={`drawer ${isDrawerOpen ? 'open' : 'closed'}`}>
            <button
              onClick={toggleDrawer}
              className="close-btn"
            >
              ✕
            </button>

            {user?.email && (
              <div className="drawer-user-info">
                <div className="drawer-welcome-text">
                  Welcome
                </div>
                <div className="drawer-user-email">
                  {user.email}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              disabled={loading}
              className="drawer-logout-btn"
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </>
      )}
    </>
  );
}; 