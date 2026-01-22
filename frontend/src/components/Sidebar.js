import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import DashboardIcon from '@mui/icons-material/Dashboard';
import HotelIcon from '@mui/icons-material/Hotel';
import LogoutIcon from '@mui/icons-material/Logout';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();
  
  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
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
          <DashboardIcon className="menu-icon" />
          <span className="menu-text">Dashboard</span>
        </Link>
        
        <Link 
          to="/hotels" 
          className={`menu-item ${isActive('/hotels') ? 'active' : ''}`}
        >
          <HotelIcon className="menu-icon" />
          <span className="menu-text">Liste des hôtels</span>
        </Link>
      </nav>

      <div className="sidebar-footer">
        <button 
          onClick={handleLogout}
          className="logout-btn"
        >
          <LogoutIcon className="menu-icon" />
          <span className="menu-text">Déconnexion</span>
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
