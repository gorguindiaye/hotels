import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import api from '../utils/api';
import { validateEmail, getErrorMessage } from '../utils/validation';
import '../styles/AuthLayout.css';
import '../styles/ForgotPassword.css';

const ForgotPassword = () => {
  const [email, setEmail] = useState('');
  const [error, setError] = useState('');
  const [success, setSuccess] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleChange = (e) => {
    setEmail(e.target.value);
    setError('');
    setSuccess(false);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess(false);

    if (!email.trim()) {
      setError('Veuillez entrer votre adresse e-mail.');
      return;
    }

    if (!validateEmail(email)) {
      setError('Veuillez entrer une adresse e-mail valide.');
      return;
    }

    setLoading(true);

    try {
      await api.post('/auth/password-reset/', {
        email: email.trim().toLowerCase()
      });

      setSuccess(true);
      setTimeout(() => {
        navigate('/confirmation');
      }, 2000);
    } catch (err) {
      const errorMessage = getErrorMessage(err);
      setError(errorMessage);
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
          <h1 className="auth-title">Mot de passe oublié ?</h1>
          <p className="auth-description">
            Entrez l'adresse e-mail associée à votre compte hôtelier.
            <br />
            Nous vous enverrons un lien pour réinitialiser votre mot de passe.
          </p>
          
          {error && <div className="error-message">{error}</div>}
          {success && <div className="success-message">E-mail envoyé avec succès ! Redirection...</div>}
          
          <form onSubmit={handleSubmit} className="auth-form" noValidate>
            <div className="form-group">
              <input
                type="email"
                name="email"
                id="email"
                value={email}
                onChange={handleChange}
                className={`form-input ${error ? 'error' : ''}`}
                placeholder="Votre e-mail"
                required
                autoComplete="email"
                disabled={success}
              />
              <label htmlFor="email" className="form-label">E-mail</label>
            </div>

            <button type="submit" className="btn-primary" disabled={loading || success}>
              {loading ? 'Envoi...' : success ? 'Envoyé !' : 'Envoyer'}
            </button>

            <div className="form-footer">
              <Link to="/login" className="link-secondary">
                Retour à la connexion
              </Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default ForgotPassword;
