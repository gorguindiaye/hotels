import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Logout = () => {
  const navigate = useNavigate();

  useEffect(() => {
    // Supprimer tous les tokens et données de session
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('remember_me');
    localStorage.removeItem('darkMode');
    localStorage.removeItem('user_role');
    
    // Forcer un délai et rediriger
    setTimeout(() => {
      navigate('/login', { replace: true });
      window.location.reload();
    }, 500);
  }, [navigate]);

  return (
    <div style={{ 
      display: 'flex', 
      justifyContent: 'center', 
      alignItems: 'center', 
      height: '100vh',
      backgroundColor: '#f5f5f5'
    }}>
      <div style={{ textAlign: 'center' }}>
        <h1>Déconnexion en cours...</h1>
        <p>Vous allez être redirigé vers la page de connexion.</p>
      </div>
    </div>
  );
};

export default Logout;
