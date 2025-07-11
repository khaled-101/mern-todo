// src/pages/SignupPage.jsx
import React from 'react';
import {
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  Button,
  useTheme
} from '@mui/material';
import SignupForm from '../components/Auth/SignupForm';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const SignupPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();

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
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.25), 0 0 15px ${theme.palette.secondary.light}`,
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette.primary.main}, ${theme.palette.secondary.main})`,
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
              transform: 'rotate(-15deg) scale(1.1)',
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
          <SignupForm />
          <Button
            variant="outlined"
            fullWidth
            sx={{ 
              mt: 3,
              py: 1.5,
              fontWeight: 600,
              letterSpacing: 0.5,
              transition: 'all 0.3s ease',
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
                transform: 'translateY(-2px)',
                boxShadow: `0 4px 8px ${theme.palette.primary.light}`,
                background: 'rgba(25, 118, 210, 0.04)'
              }
            }}
            onClick={() => navigate('/login')}
          >
            Back to Login
          </Button>
        </Box>
      </Paper>
    </Container>
  );
};

export default SignupPage;