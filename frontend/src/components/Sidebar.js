import React from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Drawer,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
  ListItemText,
  Divider,
  Box,
  Typography,
  Button,
} from '@mui/material';
import {
  Dashboard as DashboardIcon,
  Hotel as HotelIcon,
  BookOnline as ReservationIcon,
  Person as ProfileIcon,
  Logout as LogoutIcon,
} from '@mui/icons-material';
import '../styles/Sidebar.css';

const Sidebar = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const isActive = (path) => location.pathname === path;

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    localStorage.removeItem('remember_me');
    localStorage.removeItem('user_role');
    navigate('/login');
  };

  const menuItems = [
    { text: 'Dashboard', icon: <DashboardIcon />, path: '/dashboard' },
    { text: 'Hôtels', icon: <HotelIcon />, path: '/hotels' },
    { text: 'Réservations', icon: <ReservationIcon />, path: '/reservations' },
  ];

  return (
    <Drawer
      sx={{
        width: 260,
        flexShrink: 0,
        '& .MuiDrawer-paper': {
          width: 260,
          boxSizing: 'border-box',
          backgroundColor: 'background.paper',
          borderRight: '1px solid',
          borderColor: 'divider',
        },
      }}
      variant="permanent"
      anchor="left"
    >
      <Box sx={{ p: 2 }}>
        <Typography variant="h6" sx={{ fontWeight: 'bold', color: 'primary.main' }}>
          🏨 HOTEL MANAGER
        </Typography>
      </Box>

      <Divider />

      <List sx={{ flex: 1 }}>
        {menuItems.map((item) => (
          <ListItem key={item.path} disablePadding>
            <ListItemButton
              component={Link}
              to={item.path}
              selected={isActive(item.path)}
              sx={{
                '&.Mui-selected': {
                  backgroundColor: 'primary.light',
                  '& .MuiListItemIcon-root': {
                    color: 'primary.main',
                  },
                },
              }}
            >
              <ListItemIcon>{item.icon}</ListItemIcon>
              <ListItemText primary={item.text} />
            </ListItemButton>
          </ListItem>
        ))}
      </List>

      <Divider />

      <Box sx={{ p: 2, display: 'flex', flexDirection: 'column', gap: 1 }}>
        <ListItem disablePadding>
          <ListItemButton
            component={Link}
            to="/profile"
            selected={isActive('/profile')}
            sx={{
              '&.Mui-selected': {
                backgroundColor: 'primary.light',
              },
            }}
          >
            <ListItemIcon>
              <ProfileIcon />
            </ListItemIcon>
            <ListItemText primary="Profil" />
          </ListItemButton>
        </ListItem>

        <Button
          variant="contained"
          color="error"
          startIcon={<LogoutIcon />}
          onClick={handleLogout}
          fullWidth
          sx={{ textTransform: 'none' }}
        >
          Déconnexion
        </Button>
      </Box>
    </Drawer>
  );
};

export default Sidebar;
