import React, { useState } from "react";
import { useAuth } from "../../../contexts/AuthContext";
import { useNavigate } from "react-router-dom";
import { useLocation } from "react-router-dom";
import "./Header.css";

interface HeaderProps {
  loading: boolean;
}

export const Header: React.FC<HeaderProps> = ({ loading }) => {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleLogout = async () => {
    try {
      await logout();
      navigate("/");
    } catch (error) {
      console.error("Logout error:", error);
    }
  };

  const handleHistory = () => {
    if (!user) {
      navigate("/");
      return;
    }
    navigate("/history");
    setIsDrawerOpen(false);
  };

  const handleLogo = () => {
    navigate("/");
    setIsDrawerOpen(false);
  };

  const toggleDrawer = () => {
    setIsDrawerOpen(!isDrawerOpen);
  };

  const historyPageButtonVisible = location.pathname !== "/history";
  const makeGuessPageButtonVisible = location.pathname !== "/";

  return (
    <>
      <div className="header-desktop">
        <button className="logo" onClick={handleLogo}>
          ₿ BitPredict
        </button>

        <div className="user-info">
          {user?.email && (
            <div className="user-welcome">
              <span className="welcome-text">Welcome:</span>
              <span className="user-email">{user.email}</span>
            </div>
          )}

          {makeGuessPageButtonVisible && (
            <button
              onClick={handleLogo}
              className="header-btn bg-blue-400 hover:bg-blue-500"
            >
              Make Guess
            </button>
          )}

          {historyPageButtonVisible && (
            <button
              onClick={handleHistory}
              className="header-btn bg-gray-600 hover:bg-gray-700"
            >
              History
            </button>
          )}

          <button
            onClick={handleLogout}
            disabled={loading}
            className="header-btn bg-red-600 hover:bg-red-700"
          >
            {loading ? "Logging out..." : "Log out"}
          </button>
        </div>
      </div>

      <div className="header-mobile">
        <button onClick={toggleDrawer} className="menu-btn">
          ☰
        </button>

        <button className="logo-mobile" onClick={handleLogo}>
          ₿ BitPredict
        </button>

        <div className="spacer"></div>
      </div>

      {isDrawerOpen && (
        <>
          <div className="overlay" onClick={toggleDrawer} />

          <div className={`drawer ${isDrawerOpen ? "open" : "closed"}`}>
            <button onClick={toggleDrawer} className="close-btn">
              ✕
            </button>
            <button onClick={handleLogo} className="logo-mobile">
              ₿ BitPredict
            </button>

            {user?.email && (
              <div className="drawer-user-info">
                <div className="drawer-welcome-text">Welcome</div>
                <div className="drawer-user-email">{user.email}</div>
              </div>
            )}

            {makeGuessPageButtonVisible && (
              <button
                onClick={handleLogo}
                className="mobile-drawer-btn bg-blue-400"
              >
                Make Guess
              </button>
            )}

            {historyPageButtonVisible && (
              <button
                onClick={handleHistory}
                className="mobile-drawer-btn bg-gray-600"
              >
                History
              </button>
            )}

            <button
              onClick={handleLogout}
              disabled={loading}
              className="mobile-drawer-btn bg-red-600 hover:bg-red-700"
            >
              {loading ? "Logging out..." : "Logout"}
            </button>
          </div>
        </>
      )}
    </>
  );
};
