import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { validateEmail, validatePassword, validateUsername, validatePhone, getErrorMessage } from '../utils/validation';
import { testServerConnection } from '../utils/testConnection';
import '../styles/AuthLayout.css';
import '../styles/Register.css';

const Register = () => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    password_confirm: '',
    hotel_name: '',
    first_name: '',
    last_name: '',
    phone: ''
  });
  const [errors, setErrors] = useState({});
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    if (token) {
      navigate('/dashboard');
    }
  }, [navigate]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    // Clear error for this field
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.first_name.trim()) {
      newErrors.first_name = 'Le prénom est requis.';
    }

    if (!formData.last_name.trim()) {
      newErrors.last_name = 'Le nom est requis.';
    }

    if (!formData.username.trim()) {
      newErrors.username = 'Le nom d\'utilisateur est requis.';
    } else if (!validateUsername(formData.username)) {
      newErrors.username = 'Le nom d\'utilisateur doit contenir au moins 3 caractères (lettres, chiffres, underscore).';
    }

    if (!formData.email.trim()) {
      newErrors.email = 'L\'adresse e-mail est requise.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse e-mail valide.';
    }

    if (!formData.hotel_name.trim()) {
      newErrors.hotel_name = 'Le nom de l\'hôtel est requis.';
    }

    if (formData.phone && !validatePhone(formData.phone)) {
      newErrors.phone = 'Veuillez entrer un numéro de téléphone valide.';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis.';
    } else if (!validatePassword(formData.password)) {
      newErrors.password = 'Le mot de passe doit contenir au moins 8 caractères.';
    }

    if (!formData.password_confirm) {
      newErrors.password_confirm = 'Veuillez confirmer votre mot de passe.';
    } else if (formData.password !== formData.password_confirm) {
      newErrors.password_confirm = 'Les mots de passe ne correspondent pas.';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      return;
    }

    setErrors({});
    setLoading(true);

    try {
      // Test server connection first
      const connectionTest = await testServerConnection();
      if (!connectionTest.connected) {
        setErrors({ general: connectionTest.error });
        setLoading(false);
        return;
      }

      const response = await api.post('/auth/register/', {
        username: formData.username.trim(),
        email: formData.email.trim().toLowerCase(),
        password: formData.password,
        password_confirm: formData.password_confirm,
        hotel_name: formData.hotel_name.trim(),
        first_name: formData.first_name.trim(),
        last_name: formData.last_name.trim(),
        phone: formData.phone.trim() || ''
      });

      if (response.data.access && response.data.refresh) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);

        navigate('/dashboard');
      } else {
        setErrors({ general: 'Réponse invalide du serveur.' });
      }
    } catch (err) {
      if (err.response?.data) {
        const apiErrors = err.response.data;
        const formattedErrors = {};
        
        // Format errors from API
        Object.keys(apiErrors).forEach(key => {
          if (Array.isArray(apiErrors[key])) {
            formattedErrors[key] = apiErrors[key][0];
          } else if (typeof apiErrors[key] === 'string') {
            formattedErrors[key] = apiErrors[key];
          } else if (typeof apiErrors[key] === 'object') {
            formattedErrors[key] = Object.values(apiErrors[key])[0];
          }
        });
        
        setErrors(formattedErrors);
      } else {
        const errorMessage = getErrorMessage(err);
        setErrors({ general: errorMessage });
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="auth-layout">
      <div className="auth-left">
        <div className="auth-pattern"></div>
      </div>
      <div className="auth-right">
        <div className="auth-header">
          <div className="logo-icon"></div>
          <div className="logo-text">HOTEL MANAGER PRO</div>
        </div>
        <div className="auth-card">
          <h1 className="auth-title">Créer votre compte hôtelier</h1>
          <p className="auth-subtitle">Inscrivez-vous pour gérer votre établissement</p>
          
          {errors.general && <div className="error-message">{errors.general}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form register-form" noValidate>
            <div className="form-row">
              <div className="form-group">
                <input
                  type="text"
                  name="first_name"
                  id="first_name"
                  value={formData.first_name}
                  onChange={handleChange}
                  className={`form-input ${errors.first_name ? 'error' : ''}`}
                  placeholder="Prénom"
                  required
                  autoComplete="given-name"
                />
                <label htmlFor="first_name" className="form-label">Prénom</label>
                {errors.first_name && <span className="field-error">{errors.first_name}</span>}
              </div>

              <div className="form-group">
                <input
                  type="text"
                  name="last_name"
                  id="last_name"
                  value={formData.last_name}
                  onChange={handleChange}
                  className={`form-input ${errors.last_name ? 'error' : ''}`}
                  placeholder="Nom"
                  required
                  autoComplete="family-name"
                />
                <label htmlFor="last_name" className="form-label">Nom</label>
                {errors.last_name && <span className="field-error">{errors.last_name}</span>}
              </div>
            </div>

            <div className="form-group">
              <input
                type="text"
                name="username"
                id="username"
                value={formData.username}
                onChange={handleChange}
                className={`form-input ${errors.username ? 'error' : ''}`}
                placeholder="Nom d'utilisateur"
                required
                autoComplete="username"
              />
              <label htmlFor="username" className="form-label">Nom d'utilisateur</label>
              {errors.username && <span className="field-error">{errors.username}</span>}
            </div>

            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="Adresse e-mail professionnelle"
                required
                autoComplete="email"
              />
              <label htmlFor="email" className="form-label">E-mail</label>
              {errors.email && <span className="field-error">{errors.email}</span>}
            </div>

            <div className="form-group">
              <input
                type="text"
                name="hotel_name"
                id="hotel_name"
                value={formData.hotel_name}
                onChange={handleChange}
                className={`form-input ${errors.hotel_name ? 'error' : ''}`}
                placeholder="Nom de l'hôtel"
                required
                autoComplete="organization"
              />
              <label htmlFor="hotel_name" className="form-label">Nom de l'hôtel</label>
              {errors.hotel_name && <span className="field-error">{errors.hotel_name}</span>}
            </div>

            <div className="form-group">
              <input
                type="tel"
                name="phone"
                id="phone"
                value={formData.phone}
                onChange={handleChange}
                className={`form-input ${errors.phone ? 'error' : ''}`}
                placeholder="Téléphone (optionnel)"
                autoComplete="tel"
              />
              <label htmlFor="phone" className="form-label">Téléphone</label>
              {errors.phone && <span className="field-error">{errors.phone}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password"
                id="password"
                value={formData.password}
                onChange={handleChange}
                className={`form-input ${errors.password ? 'error' : ''}`}
                placeholder="Mot de passe"
                required
                autoComplete="new-password"
              />
              <label htmlFor="password" className="form-label">Mot de passe</label>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="form-group">
              <input
                type="password"
                name="password_confirm"
                id="password_confirm"
                value={formData.password_confirm}
                onChange={handleChange}
                className={`form-input ${errors.password_confirm ? 'error' : ''}`}
                placeholder="Confirmer le mot de passe"
                required
                autoComplete="new-password"
              />
              <label htmlFor="password_confirm" className="form-label">Confirmer le mot de passe</label>
              {errors.password_confirm && <span className="field-error">{errors.password_confirm}</span>}
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Inscription...' : 'Créer mon compte'}
            </button>

            <div className="form-footer">
              <span>Vous avez déjà un compte ? </span>
              <Link to="/login" className="link-secondary">
                Se connecter
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Register;
