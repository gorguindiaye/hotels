import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { validateEmail, getErrorMessage } from '../utils/validation';
import '../styles/AuthLayout.css';
import '../styles/Login.css';

const Login = () => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    rememberMe: false
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
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    // Clear errors when user types
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.email.trim()) {
      newErrors.email = 'L\'adresse e-mail est requise.';
    } else if (!validateEmail(formData.email)) {
      newErrors.email = 'Veuillez entrer une adresse e-mail valide.';
    }

    if (!formData.password) {
      newErrors.password = 'Le mot de passe est requis.';
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
      const response = await api.post('/auth/login/', {
        email: formData.email.trim(),
        password: formData.password
      });

      if (response.data.access && response.data.refresh) {
        localStorage.setItem('access_token', response.data.access);
        localStorage.setItem('refresh_token', response.data.refresh);
        
        if (formData.rememberMe) {
          localStorage.setItem('remember_me', 'true');
        } else {
          localStorage.removeItem('remember_me');
        }

        navigate('/dashboard');
      } else {
        setErrors({ general: 'Réponse invalide du serveur.' });
      }
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setErrors({ general: errorMessage });
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
          <h1 className="auth-title">Connectez-vous à votre espace hôtel</h1>
          <p className="auth-subtitle">Accès sécurisé aux gestionnaires d'hôtel</p>
          
          {errors.general && <div className="error-message">{errors.general}</div>}
          
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                value={formData.email}
                onChange={handleChange}
                className={`form-input ${errors.email ? 'error' : ''}`}
                placeholder="E-mail"
                required
                autoComplete="email"
              />
              <label htmlFor="email" className="form-label">E-mail</label>
              {errors.email && <span className="field-error">{errors.email}</span>}
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
                autoComplete="current-password"
              />
              <label htmlFor="password" className="form-label">Mot de passe</label>
              {errors.password && <span className="field-error">{errors.password}</span>}
            </div>

            <div className="form-options">
              <label className="checkbox-label">
                <input
                  type="checkbox"
                  name="rememberMe"
                  checked={formData.rememberMe}
                  onChange={handleChange}
                  className="checkbox-input"
                />
                <span>Se souvenir de moi</span>
              </label>
            </div>

            <button type="submit" className="btn-primary" disabled={loading}>
              {loading ? 'Connexion...' : 'Se connecter'}
            </button>

            <div className="form-footer">
              <Link to="/forgot-password" className="link-secondary">
                Mot de passe oublié ?
              </Link>
            </div>

            <div className="register-link">
              <span>Pas encore de compte ? </span>
              <Link to="/register">Créer un compte</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;
