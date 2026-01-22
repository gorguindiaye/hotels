import React from 'react';
import { Box } from '@mui/material';
import Sidebar from './Sidebar';
import '../styles/MainLayout.css';

const MainLayout = ({ children }) => {
  return (
    <Box sx={{ display: 'flex', height: '100vh', width: '100%' }}>
      <Sidebar />
      <Box
        component="main"
        sx={{
          flex: 1,
          overflow: 'auto',
          backgroundColor: 'background.default',
          p: 3,
        }}
      >
        {children}
      </Box>
    </Box>
  );
};

export default MainLayout;
