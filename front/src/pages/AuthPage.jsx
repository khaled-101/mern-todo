import React, { useState } from 'react';
import { 
  Container, 
  Paper, 
  Tabs, 
  Tab, 
  Box, 
  Avatar, 
  Typography
} from '@mui/material';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import ChecklistIcon from '@mui/icons-material/Checklist';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);

  const handleTabChange = (event, newValue) => {
    setActiveTab(newValue);
  };

  return (
    <Container 
      maxWidth="sm" 
      sx={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'center',
        py: 4
      }}
    >
      <Paper elevation={6} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* Header with Logo */}
        <Box 
          sx={{ 
            bgcolor: 'primary.main', 
            py: 3,
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center'
          }}
        >
          <Avatar sx={{ 
            bgcolor: 'white', 
            mb: 1, 
            width: 56, 
            height: 56,
            '& .MuiSvgIcon-root': {
              fontSize: '2.5rem'
            }
          }}>
            <ChecklistIcon color="primary" />
          </Avatar>
          <Typography 
            variant="h4" 
            component="h1" 
            color="white" 
            fontWeight="bold"
          >
            TaskFlow
          </Typography>
        </Box>

        {/* Tab Navigation */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs 
            value={activeTab} 
            onChange={handleTabChange} 
            variant="fullWidth"
            aria-label="Authentication tabs"
          >
            <Tab label="Sign In" />
            <Tab label="Create Account" />
          </Tabs>
        </Box>

        {/* Form Container with optimized padding */}
        <Box sx={{ 
          p: { xs: 2, sm: 4 },
          display: 'flex',
          flexDirection: 'column',
          gap: 2
        }}>
          {activeTab === 0 ? (
            <LoginForm onSwitchToSignup={() => setActiveTab(1)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setActiveTab(0)} />
          )}
        </Box>
      </Paper>
      
      {/* Footer */}
      <Box textAlign="center" mt={2}>
        <Typography variant="body2" color="textSecondary">
          © {new Date().getFullYear()} TaskFlow. All rights reserved.
        </Typography>
      </Box>
    </Container>
  );
};

export default AuthPage;