// src/pages/LoginPage.jsx
import React, { useState } from 'react';
import {
  Container,
  Paper,
  Box,
  Avatar,
  Typography,
  TextField,
  Button,
  Checkbox,
  FormControlLabel,
  Link,
  useTheme
} from '@mui/material';
import { useNavigate } from 'react-router-dom';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { keyframes } from '@emotion/react';
import { useDispatch } from 'react-redux';
import { loginUser } from '../Redux/authSlice';

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

const LoginPage = () => {
  const theme = useTheme();
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const [credentials, setCredentials] = useState({ 
    email: '', 
    password: '' 
  });
  const [rememberMe, setRememberMe] = useState(false);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setCredentials(prev => ({ ...prev, [name]: value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(loginUser(credentials));
  };

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
          <form onSubmit={handleSubmit}>
            {/* Email Field - Full Width */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Email"
                name="email"
                type="email"
                value={credentials.email}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& fieldset': {
                      borderWidth: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Box>
            
            {/* Password Field - Full Width */}
            <Box sx={{ mb: 2 }}>
              <TextField
                fullWidth
                label="Password"
                name="password"
                type="password"
                value={credentials.password}
                onChange={handleChange}
                required
                sx={{
                  '& .MuiOutlinedInput-root': {
                    borderRadius: 1,
                    '& fieldset': {
                      borderWidth: 2,
                    },
                    '&:hover fieldset': {
                      borderColor: 'primary.main',
                    },
                    '&.Mui-focused fieldset': {
                      borderColor: 'primary.main',
                      borderWidth: 2,
                    },
                  },
                }}
              />
            </Box>
            
            {/* Remember Me Checkbox */}
            <Box sx={{ mb: 3 }}>
              <FormControlLabel
                control={
                  <Checkbox 
                    checked={rememberMe} 
                    onChange={(e) => setRememberMe(e.target.checked)}
                    color="primary"
                  />
                }
                label="Remember me"
              />
            </Box>
            
            {/* Buttons - Sign In on left, Sign Up on right */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                type="submit"
                variant="contained"
                sx={{
                  width: '48%',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  boxShadow: `0 4px 10px ${theme.palette.primary.light}`,
                  py: 1.5,
                  '&:hover': {
                    transform: 'translateY(-2px)',
                    boxShadow: `0 6px 14px ${theme.palette.primary.light}`,
                  }
                }}
              >
                Sign In
              </Button>
              
              <Button 
                variant="outlined"
                onClick={() => navigate('/signup')}
                sx={{
                  width: '48%',
                  fontWeight: 600,
                  letterSpacing: 0.5,
                  borderWidth: 2,
                  py: 1.5,
                  '&:hover': {
                    borderWidth: 2,
                    transform: 'translateY(-2px)',
                  }
                }}
              >
                Create Account
              </Button>
            </Box>
            
            {/* "Don't have an account" text - Left aligned */}
            <Box sx={{ mt: 3, textAlign: 'left' }}>
              <Typography variant="body2">
                Don't have an account?{' '}
                <Link 
                  component="button" 
                  type="button"
                  onClick={() => navigate('/signup')}
                  sx={{ 
                    fontWeight: 600,
                    textDecoration: 'none',
                    '&:hover': {
                      textDecoration: 'underline',
                    }
                  }}
                >
                  Sign Up
                </Link>
              </Typography>
            </Box>
          </form>
        </Box>
      </Paper>
    </Container>
  );
};

export default LoginPage;