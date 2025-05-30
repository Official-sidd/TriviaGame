import { useState } from 'react';
import Game from './components/Game';
import Header from './components/Header';
import { ThemeProvider, createTheme } from '@mui/material/styles';
import CssBaseline from '@mui/material/CssBaseline';
import './App.css';

const theme = createTheme({
  palette: {
    mode: 'dark',
    primary: {
      main: '#4169E1', // Royal Blue as in the reference image
      light: '#00BFFF', // Deep Sky Blue for gradients
      dark: '#000080', // Navy Blue for darker areas
    },
    secondary: {
      main: '#8A2BE2', // Blue Violet for secondary elements
      light: '#9370DB', // Medium Purple for highlights
      dark: '#483D8B', // Dark Slate Blue for darker areas
    },
    background: {
      default: '#0D1117', // Very dark blue-black like in the reference
      paper: '#161B22', // Slightly lighter dark blue for cards
    },
    text: {
      primary: '#ffffff',
      secondary: 'rgba(255,255,255,0.7)',
    },
  },
  typography: {
    fontFamily: '"Poppins", "Roboto", "Helvetica", "Arial", sans-serif',
    h1: {
      fontWeight: 800,
      fontSize: '3.5rem',
    },
    h2: {
      fontWeight: 700,
      fontSize: '2.5rem',
    },
    h4: {
      fontWeight: 600,
    },
    h5: {
      fontWeight: 500,
    },
    h6: {
      fontWeight: 500,
    },
    button: {
      fontWeight: 600,
    },
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          borderRadius: 4,
          textTransform: 'none',
          fontWeight: 600,
          padding: '10px 20px',
        },
        contained: {
          boxShadow: 'none',
          '&:hover': {
            boxShadow: '0 8px 16px 0 rgba(0,0,0,0.3)',
          },
        },
      },
      variants: [
        {
          props: { variant: 'contained', color: 'primary' },
          style: {
            background: 'linear-gradient(90deg, #4169E1 0%, #00BFFF 100%)',
          },
        },
        {
          props: { variant: 'contained', color: 'secondary' },
          style: {
            background: 'linear-gradient(90deg, #8A2BE2 0%, #9370DB 100%)',
          },
        },
      ],
    },
    MuiPaper: {
      styleOverrides: {
        root: {
          borderRadius: 8,
          backgroundImage: 'none',
        },
      },
    },
    MuiAppBar: {
      styleOverrides: {
        root: {
          backgroundColor: 'transparent',
        },
      },
    },
  },
});

function App() {
  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <div className="app-container">
        <Header />
        <div className="content-container">
          <Game />
        </div>
      </div>
    </ThemeProvider>
  );
}

export default App;
