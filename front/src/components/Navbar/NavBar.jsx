// src/components/Navbar/NavBar.jsx
import React from 'react';
import { 
  AppBar, 
  Toolbar, 
  Typography, 
  Button, 
  Box, 
  Avatar,
  Chip,
  useTheme
} from '@mui/material';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { keyframes } from '@emotion/react';

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

const NavBar = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector(state => state.auth.user);

  const handleLogout = () => {
    dispatch(logout());
    navigate('/login');
  };

  return (
    <AppBar 
      position="static" 
      color="transparent" 
      elevation={0}
      sx={{ 
        background: 'transparent',
        boxShadow: 'none',
        py: 1,
      }}
    >
      <Toolbar>
        {/* TaskMaster Pro on the far right */}
        <Box sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          ml: 'auto',
          cursor: 'pointer',
        }} onClick={() => navigate('/')}>
          <Avatar sx={{ 
            bgcolor: 'primary.main', 
            width: 40, 
            height: 40,
            mr: 1,
            animation: `${float} 4s ease-in-out infinite`,
            boxShadow: '0 4px 8px rgba(0,0,0,0.2)',
            transition: 'all 0.3s ease',
            '&:hover': {
              transform: 'rotate(15deg) scale(1.1)',
              boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
            }
          }}>
            <ChecklistIcon />
          </Avatar>
          <Typography 
            variant="h6" 
            sx={{ 
              fontWeight: 700,
              letterSpacing: 0.5,
              background: `linear-gradient(45deg, ${theme.palette.primary.main} 30%, ${theme.palette.secondary.main} 90%)`,
              WebkitBackgroundClip: 'text',
              WebkitTextFillColor: 'transparent',
            }}
          >
            TaskMaster Pro
          </Typography>
        </Box>

        <Box sx={{ flexGrow: 1 }} />

        {/* User info and logout button */}
        {user && (
          <Box sx={{ display: 'flex', alignItems: 'center' }}>
            <Chip
              avatar={<Avatar sx={{ bgcolor: 'secondary.main' }}>{user.username.charAt(0).toUpperCase()}</Avatar>}
              label={user.username}
              variant="outlined"
              sx={{ 
                mr: 2, 
                fontWeight: 600,
                borderWidth: 2,
                '& .MuiChip-avatar': {
                  color: 'white',
                }
              }}
            />
            <Button 
              variant="outlined"
              onClick={handleLogout}
              sx={{
                fontWeight: 600,
                letterSpacing: 0.5,
                borderWidth: 2,
                '&:hover': {
                  borderWidth: 2,
                  transform: 'translateY(-2px)',
                  boxShadow: `0 4px 8px ${theme.palette.primary.light}`,
                }
              }}
            >
              Sign Out
            </Button>
          </Box>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default NavBar;