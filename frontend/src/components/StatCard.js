import React from 'react';
import '../styles/StatCard.css';

const StatCard = ({ icon, number, label, description, color }) => {
  return (
    <div className="stat-card">
      <div className={`stat-icon ${color}`}>
        {icon}
      </div>
      <div className="stat-content">
        <h3 className="stat-number">{number}</h3>
        <p className="stat-label">{label}</p>
        <p className="stat-description">{description}</p>
      </div>
    </div>
  );
};

export default StatCard;
