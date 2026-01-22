import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import { ThemeProvider } from '@mui/material/styles';
import { Box, CircularProgress } from '@mui/material';
import { lightTheme, darkTheme } from './theme';

// Pages
import Login from './pages/Login';
import Register from './pages/Register';
import ForgotPassword from './pages/ForgotPassword';
import Dashboard from './pages/Dashboard';
import Hotels from './pages/Hotels';
import Logout from './pages/Logout';
import ClearCache from './pages/ClearCache';
import Test from './pages/Test';

// Layouts
import MainLayout from './components/MainLayout';
import './App.css';

// Protected Route Component
const ProtectedRoute = ({ children, isAuthenticated, isLoading }) => {
  if (isLoading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" minHeight="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return isAuthenticated ? <MainLayout>{children}</MainLayout> : <Navigate to="/login" replace />;
};

function App() {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [darkMode, setDarkMode] = useState(false);

  useEffect(() => {
    // Check if user is already logged in
    const token = localStorage.getItem('access_token');
    console.log('Token exists:', !!token);
    console.log('Is authenticated:', !!token);
    
    setIsAuthenticated(!!token);
    setIsLoading(false);

    // Charger les préférences de thème
    const savedDarkMode = localStorage.getItem('darkMode');
    if (savedDarkMode) {
      setDarkMode(JSON.parse(savedDarkMode));
    }
  }, []);

  const handleThemeToggle = () => {
    const newDarkMode = !darkMode;
    setDarkMode(newDarkMode);
    localStorage.setItem('darkMode', JSON.stringify(newDarkMode));
  };

  const theme = darkMode ? darkTheme : lightTheme;

  return (
    <ThemeProvider theme={theme}>
      <Box sx={{ backgroundColor: theme.palette.background.default, minHeight: '100vh' }}>
        <Router>
          <Routes>
            <Route path="/test" element={<Test />} />
            <Route path="/login" element={<Login />} />
            <Route path="/register" element={<Register />} />
            <Route path="/forgot-password" element={<ForgotPassword />} />
            <Route path="/logout" element={<Logout />} />
            <Route path="/clear-cache" element={<ClearCache />} />
            <Route path="/dashboard" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Dashboard onThemeToggle={handleThemeToggle} darkMode={darkMode} />
              </ProtectedRoute>
            } />
            <Route path="/hotels" element={
              <ProtectedRoute isAuthenticated={isAuthenticated} isLoading={isLoading}>
                <Hotels />
              </ProtectedRoute>
            } />
            <Route path="/" element={<Navigate to={isAuthenticated ? "/dashboard" : "/login"} replace />} />
          </Routes>
        </Router>
      </Box>
    </ThemeProvider>
  );
}

export default App;


