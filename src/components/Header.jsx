import React from 'react';
import { AppBar, Toolbar, Typography, Box, IconButton } from '@mui/material';
import { Person } from '@mui/icons-material';

const Header = () => {
  return (
    <AppBar position="static" sx={{ 
      backgroundColor: 'transparent', 
      boxShadow: 'none',
      borderBottom: '1px solid rgba(255,255,255,0.1)'
    }}>
      <Toolbar>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Box
            sx={{
              width: 40,
              height: 40,
              borderRadius: '50%',
              background: 'linear-gradient(135deg, #4169E1, #00BFFF)',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              mr: 2,
            }}
          >
            <Typography variant="h6" sx={{ color: '#fff', fontWeight: 'bold' }}>
              T
            </Typography>
          </Box>
        </Box>
        
        <Box sx={{ display: 'flex', flexGrow: 1, ml: 4 }}>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: '#fff', 
              mr: 3, 
              fontWeight: 'bold',
              borderBottom: '2px solid #4169E1',
              pb: 1
            }}
          >
            Home
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              mr: 3,
              '&:hover': {
                color: '#fff'
              }
            }}
          >
            Leaderboard
          </Typography>
          <Typography 
            variant="subtitle1" 
            sx={{ 
              color: 'rgba(255,255,255,0.7)', 
              mr: 3,
              '&:hover': {
                color: '#fff'
              }
            }}
          >
            Help
          </Typography>
        </Box>
        
        <IconButton color="inherit">
          <Person />
        </IconButton>
      </Toolbar>
    </AppBar>
  );
};

export default Header;
