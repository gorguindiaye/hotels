import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import MainLayout from '../components/MainLayout';
import StatCard from '../components/StatCard';
import api from '../utils/api';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchUser = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        const response = await api.get('/auth/me/');
        setUser(response.data);
      } catch (error) {
        console.error('Error fetching user:', error);
        localStorage.removeItem('access_token');
        localStorage.removeItem('refresh_token');
        navigate('/login');
      } finally {
        setLoading(false);
      }
    };

    fetchUser();
  }, [navigate]);

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    navigate('/login');
  };

  if (loading) {
    return (
      <MainLayout>
        <div className="loading-container">
          <div className="loading-spinner"></div>
          <p>Chargement...</p>
        </div>
      </MainLayout>
    );
  }

  return (
    <MainLayout>
      <div className="dashboard-page">
        <div className="dashboard-header">
          <div className="header-text">
            <h1 className="dashboard-title">Bienvenue sur RED Product</h1>
            <p className="dashboard-subtitle">Gérez vos hôtels et réservations de façon efficace</p>
          </div>
        </div>

        <section className="stats-section">
          <div className="stats-grid">
            <StatCard
              icon="📋"
              number="125"
              label="Formulaires"
              description="Je ne sais pas quoi mettre"
              color="violet-pastel"
            />
            <StatCard
              icon="💬"
              number="40"
              label="Messages"
              description="Je ne sais pas quoi mettre"
              color="turquoise"
            />
            <StatCard
              icon="📧"
              number="25"
              label="E-mails"
              description="Je ne sais pas quoi mettre"
              color="red"
            />
            <StatCard
              icon="🏨"
              number="8"
              label="Hôtels"
              description="Je ne sais pas quoi mettre"
              color="violet-dark"
            />
          </div>
        </section>
      </div>
    </MainLayout>
  );
};

export default Dashboard;


