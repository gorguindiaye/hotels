import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/AuthLayout.css';
import '../styles/Confirmation.css';

const Confirmation = () => {
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
          <div className="confirmation-icon">
            <svg width="64" height="64" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
              <path d="M9 16.17L4.83 12l-1.42 1.41L9 19 21 7l-1.41-1.41L9 16.17z" fill="#4CAF50"/>
            </svg>
          </div>
          <h1 className="auth-title">E-mail envoyé</h1>
          <p className="auth-description">
            Si un compte existe pour cette adresse, vous recevrez un e-mail de réinitialisation dans quelques instants.
          </p>
          
          <div className="form-footer">
            <Link to="/login" className="btn-primary">
              Retour à la connexion
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Confirmation;
