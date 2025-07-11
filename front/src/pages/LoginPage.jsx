// src/pages/LoginPage.jsx
import React from 'react';
import {
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  useTheme
} from '@mui/material';
import LoginForm from '../components/Auth/LoginForm';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { keyframes } from '@emotion/react';

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const LoginPage = () => {
  const theme = useTheme();

  return (
    <Container maxWidth="sm" sx={{
      minHeight: '100vh',
      display: 'flex',
      flexDirection: 'column',
      justifyContent: 'center',
      py: 4,
    }}>
      <Paper 
        elevation={12}
        sx={{
          borderRadius: 2,
          overflow: 'hidden',
          transform: 'scale(1.02)',
          transition: 'all 0.3s ease-in-out',
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px ${theme.palette.primary.light}`,
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
            opacity: 1,
            zIndex: 2,
          }
        }}
      >
        {/* Header */}
        <Box sx={{ 
          bgcolor: 'primary.main', 
          color: 'white', 
          py: 4, 
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
          '&:after': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: '100%',
            background: 'radial-gradient(circle at center, rgba(255,255,255,0.1) 0%, transparent 70%)',
          }
        }}>
          <Avatar sx={{ 
            bgcolor: 'secondary.main', 
            mb: 2, 
            width: 60, 
            height: 60, 
            mx: 'auto',
            zIndex: 1,
            position: 'relative',
            animation: `${float} 3s ease-in-out infinite`,
            boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(15deg) scale(1.1)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            }
          }}>
            <ChecklistIcon fontSize="large" />
          </Avatar>
          <Typography variant="h5" component="h1" sx={{ 
            fontWeight: 700,
            letterSpacing: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.2)',
            zIndex: 1,
            position: 'relative'
          }}>
            TaskMaster Pro
          </Typography>
        </Box>

        {/* Form */}
        <Box sx={{ 
          p: { xs: 2, sm: 4 },
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(5px)',
        }}>
          <LoginForm />
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;