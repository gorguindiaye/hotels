import React from 'react';
import { useNavigate } from 'react-router-dom';

const Test = () => {
  const navigate = useNavigate();
  const token = localStorage.getItem('access_token');

  return (
    <div style={{ padding: '40px', fontFamily: 'Arial' }}>
      <h1>Page de Test</h1>
      
      <div style={{ 
        backgroundColor: '#f0f0f0', 
        padding: '20px', 
        borderRadius: '8px',
        marginBottom: '20px'
      }}>
        <h2>État du localStorage :</h2>
        <p><strong>Token présent :</strong> {token ? 'OUI' : 'NON'}</p>
        <p><strong>Token value :</strong> {token ? token.substring(0, 50) + '...' : 'Aucun'}</p>
      </div>

      <div style={{ display: 'flex', gap: '10px' }}>
        <button 
          onClick={() => {
            localStorage.removeItem('access_token');
            localStorage.removeItem('refresh_token');
            alert('localStorage nettoyé');
            window.location.reload();
          }}
          style={{
            padding: '10px 20px',
            backgroundColor: '#e74c3c',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Nettoyer & Recharger
        </button>

        <button 
          onClick={() => navigate('/login')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#3498db',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Aller au Login
        </button>

        <button 
          onClick={() => navigate('/dashboard')}
          style={{
            padding: '10px 20px',
            backgroundColor: '#2ecc71',
            color: 'white',
            border: 'none',
            borderRadius: '4px',
            cursor: 'pointer'
          }}
        >
          Aller au Dashboard
        </button>
      </div>
    </div>
  );
};

export default Test;
