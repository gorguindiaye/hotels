import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import api from '../utils/api';
import { hotelsAPI } from '../utils/hotelsAPI';
import '../styles/Dashboard.css';

const Dashboard = () => {
  const [user, setUser] = useState(null);
  const [stats, setStats] = useState({
    hotels: 0,
    reservations: 0,
    rooms: 0,
    forms: 125
  });
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const token = localStorage.getItem('access_token');
      
      if (!token) {
        navigate('/login');
        return;
      }

      try {
        // Fetch hotels count only (removed user fetch for faster loading)
        const hotelsResponse = await hotelsAPI.getHotels();
        const hotelsCount = Array.isArray(hotelsResponse.data) 
          ? hotelsResponse.data.length 
          : hotelsResponse.data.count || 0;

        setStats(prev => ({
          ...prev,
          hotels: hotelsCount
        }));
      } catch (error) {
        console.error('Error fetching data:', error);
        if (error.response?.status === 401) {
          localStorage.removeItem('access_token');
          localStorage.removeItem('refresh_token');
          navigate('/login');
        }
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [navigate]);

  if (loading) {
    return (
      <div className="loading-container">
        <div className="spinner"></div>
        <p>Chargement du tableau de bord...</p>
      </div>
    );
  }

  return (
    <div className="dashboard-page">
      <div className="dashboard-header">
        <div className="header-text">
          <h1 className="dashboard-title">Bienvenue sur RED Product</h1>
          <p className="dashboard-subtitle">Lorem ipsum dolor sit amet consectetur</p>
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
            number={stats.hotels.toString()}
            label="Hôtels"
            description="Je ne sais pas quoi mettre"
            color="violet-dark"
          />
        </div>
      </section>
    </div>
  );
};

export default Dashboard;


