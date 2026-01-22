import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    // Remove tokens from localStorage
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('remember_me');
    
    // Redirect to login page
    navigate('/login');
  };

  return (
    <aside className="sidebar">
      <div className="sidebar-header">
        <h2 className="sidebar-title">Principal</h2>
      </div>

      <nav className="sidebar-menu">
        <Link
          to="/dashboard"
          className={`menu-item ${isActive('/dashboard') ? 'active' : ''}`}
        >
          <span className="menu-icon">📊</span>
          <span className="menu-text">Dashboard</span>
        </Link>

        <Link
          to="/hotels"
          className={`menu-item ${isActive('/hotels') ? 'active' : ''}`}
        >
          <span className="menu-icon">🏨</span>
          <span className="menu-text">Liste des hôtels</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button className="logout-btn" onClick={handleLogout}>Déconnexion</button>
      </div>
    </aside>
  );
};

export default Sidebar;
