import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Confirmation from './pages/Confirmation';
import Dashboard from './pages/Dashboard';
import Hotels from './pages/Hotels';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return <div>Chargement...</div>;
  }
  
  return isAuthenticated ? children : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    setIsAuthenticated(!!token);
    setIsLoading(false);
  }, []);

  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/confirmation" element={<Confirmation />} />
          <Route path="/dashboard" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <Dashboard />
            </ProtectedRoute>
          } />
          <Route path="/hotels" element={
            <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
              <Hotels />
            </ProtectedRoute>
          } />
          <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;


