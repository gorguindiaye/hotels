export const validateEmail = (email) => {
  const re = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  return re.test(email);
};

export const validatePassword = (password) => {
  return password.length >= 8;
};

export const validateUsername = (username) => {
  return username.length >= 3 && /^[a-zA-Z0-9_]+$/.test(username);
};

export const validatePhone = (phone) => {
  if (!phone) return true; // Optional field
  const re = /^[\d\s\-\+\(\)]+$/;
  return re.test(phone);
};

export const getErrorMessage = (error) => {
  if (!error) return 'Une erreur est survenue.';
  
  if (error.response) {
    // Server responded with error
    const data = error.response.data;
    const status = error.response.status;
    
    if (status === 500) {
      return 'Erreur serveur. Veuillez réessayer plus tard.';
    }
    
    if (status === 404) {
      return 'Endpoint non trouvé. Vérifiez la configuration.';
    }
    
    if (typeof data === 'string') {
      return data;
    }
    
    if (data.error) {
      return data.error;
    }
    
    if (data.detail) {
      return data.detail;
    }
    
    // Handle field-specific errors
    const fieldErrors = Object.keys(data)
      .map(key => {
        if (Array.isArray(data[key])) {
          return data[key][0];
        }
        return data[key];
      })
      .filter(Boolean);
    
    if (fieldErrors.length > 0) {
      return fieldErrors[0];
    }
    
    return 'Une erreur est survenue lors de la requête.';
  }
  
  if (error.request) {
    // Request made but no response
    if (error.code === 'ECONNABORTED') {
      return 'La requête a pris trop de temps. Vérifiez que le serveur est démarré.';
    }
    if (error.code === 'ERR_NETWORK' || error.message.includes('Network Error')) {
      return 'Impossible de contacter le serveur. Assurez-vous que le serveur Django est démarré sur http://localhost:8000';
    }
    return 'Impossible de contacter le serveur. Vérifiez que le serveur Django est démarré.';
  }
  
  // Something else happened
  return error.message || 'Une erreur inattendue est survenue.';
};

