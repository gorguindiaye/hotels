import axios from 'axios';

export const testServerConnection = async () => {
  try {
    const response = await axios.get('http://localhost:8000/api/auth/login/', {
      timeout: 5000,
      validateStatus: () => true // Don't throw on any status
    });
    return { connected: true, status: response.status };
  } catch (error) {
    if (error.code === 'ECONNREFUSED') {
      return { connected: false, error: 'Le serveur Django n\'est pas démarré. Veuillez lancer: cd backend && python manage.py runserver' };
    }
    if (error.code === 'ECONNABORTED') {
      return { connected: false, error: 'Timeout: Le serveur ne répond pas.' };
    }
    if (error.message.includes('Network Error')) {
      return { connected: false, error: 'Erreur réseau. Vérifiez que le serveur Django est démarré sur http://localhost:8000' };
    }
    return { connected: false, error: error.message };
  }
};

