import React, { useState } from 'react';
import { useAuth } from '../../hooks/useAuth';
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
      <div className="desktop-header">
        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '10px'
        }}>
          <div style={{
            fontSize: '24px',
            fontWeight: 'bold',
            color: '#61dafb'
          }}>
            ₿ BitPredict
          </div>
        </div>

        <div style={{
          display: 'flex',
          alignItems: 'center',
          gap: '20px'
        }}>
          {user?.email && (
            <div style={{
              color: '#fff',
              fontSize: '14px',
              display: 'flex',
              alignItems: 'center',
              gap: '8px'
            }}>
              <span style={{ 
                color: '#888',
                fontSize: '12px'
              }}>
                Welcome:
              </span>
              <span style={{ 
                color: '#61dafb',
                fontWeight: '500'
              }}>
                {user.email}
              </span>
            </div>
          )}
          
          <button
            onClick={handleLogout}
            disabled={loading}
            style={{
              padding: '8px 16px',
              backgroundColor: '#dc3545',
              color: 'white',
              border: 'none',
              borderRadius: '6px',
              cursor: loading ? 'not-allowed' : 'pointer',
              fontSize: '14px',
              fontWeight: '500',
              opacity: loading ? 0.7 : 1,
              transition: 'all 0.3s ease'
            }}
            onMouseEnter={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#c82333';
              }
            }}
            onMouseLeave={(e) => {
              if (!loading) {
                e.currentTarget.style.backgroundColor = '#dc3545';
              }
            }}
          >
            {loading ? 'Logging out...' : 'Log out'}
          </button>
        </div>
      </div>

      <div className="mobile-header">
        <button
          onClick={toggleDrawer}
          style={{
            backgroundColor: 'transparent',
            border: 'none',
            color: '#fff',
            fontSize: '24px',
            cursor: 'pointer',
            padding: '5px'
          }}
        >
          ☰
        </button>

        <div style={{
          fontSize: '20px',
          fontWeight: 'bold',
          color: '#61dafb'
        }}>
          ₿ BitPredict
        </div>

        <div style={{ width: '34px' }}></div>
      </div>

      {isDrawerOpen && (
        <>
          <div
            className="mobile-overlay"
            onClick={toggleDrawer}
          />

          <div
            className={`mobile-drawer ${isDrawerOpen ? 'open' : 'closed'}`}
          >
            <button
              onClick={toggleDrawer}
              style={{
                alignSelf: 'flex-end',
                backgroundColor: 'transparent',
                border: 'none',
                color: '#fff',
                fontSize: '24px',
                cursor: 'pointer',
                padding: '5px',
                marginBottom: '20px'
              }}
            >
              ✕
            </button>

            {user?.email && (
              <div style={{
                padding: '20px 0',
                borderBottom: '1px solid #333',
                marginBottom: '20px'
              }}>
                <div style={{
                  color: '#888',
                  fontSize: '12px',
                  marginBottom: '5px'
                }}>
                  Welcome
                </div>
                <div style={{
                  color: '#61dafb',
                  fontSize: '16px',
                  fontWeight: '500',
                  wordBreak: 'break-word'
                }}>
                  {user.email}
                </div>
              </div>
            )}

            <button
              onClick={handleLogout}
              disabled={loading}
              style={{
                width: '100%',
                padding: '12px 16px',
                backgroundColor: '#dc3545',
                color: 'white',
                border: 'none',
                borderRadius: '6px',
                cursor: loading ? 'not-allowed' : 'pointer',
                fontSize: '14px',
                fontWeight: '500',
                opacity: loading ? 0.7 : 1,
                transition: 'all 0.3s ease'
              }}
            >
              {loading ? 'Logging out...' : 'Logout'}
            </button>
          </div>
        </>
      )}
    </>
  );
}; 