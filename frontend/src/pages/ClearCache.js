import React, { useEffect } from 'react';

const ClearCache = () => {
  useEffect(() => {
    // Nettoyer le localStorage
    localStorage.clear();
    sessionStorage.clear();
    
    // Nettoyer le cache IndexedDB
    if (window.indexedDB) {
      const databases = ['hotels', 'users', 'cache'];
      databases.forEach(db => {
        const req = indexedDB.deleteDatabase(db);
        req.onsuccess = () => console.log(`Database ${db} deleted`);
        req.onerror = () => console.log(`Failed to delete ${db}`);
      });
    }
    
    // Attendre un peu puis recharger
    setTimeout(() => {
      window.location.href = 'http://localhost:3000/login';
    }, 1000);
  }, []);

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh',
      backgroundColor: '#f5f5f5',
      fontSize: '18px',
      color: '#333'
    }}>
      <div>Nettoyage du cache... Redirection vers la connexion en cours...</div>
    </div>
  );
};

export default ClearCache;
