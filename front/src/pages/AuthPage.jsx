// src/pages/AuthPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Tabs,
  Tab,
  Box,
  Avatar,
  Typography,
  Snackbar
} from '@mui/material';
import LoginForm from '../components/Auth/LoginForm';
import SignupForm from '../components/Auth/SignupForm';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useSelector, useDispatch } from 'react-redux';
import { clearError } from '../Redux/authSlice';

const AuthPage = () => {
  const [activeTab, setActiveTab] = useState(0);
  const dispatch = useDispatch();
  const { status } = useSelector(state => state.auth);
  const [snackbarOpen, setSnackbarOpen] = useState(false);

  // 1) Show snackbar & flip back to Sign In when signup completes
  useEffect(() => {
    if (activeTab === 1 && status === 'succeeded') {
      setSnackbarOpen(true);
      dispatch(clearError());

      const timer = setTimeout(() => {
        setSnackbarOpen(false);
        setActiveTab(0);   // <-- Switch to LoginForm
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, [activeTab, status, dispatch]);

  return (
    <Container maxWidth="sm" sx={{ minHeight: '100vh', display: 'flex', flexDirection: 'column', justifyContent: 'center', py: 4 }}>
      <Paper elevation={6} sx={{ borderRadius: 2, overflow: 'hidden' }}>
        {/* header omitted for brevity */}

        {/* Tabs */}
        <Box sx={{ borderBottom: 1, borderColor: 'divider' }}>
          <Tabs value={activeTab} onChange={(_, v) => setActiveTab(v)} variant="fullWidth">
            <Tab label="Sign In" />
            <Tab label="Create Account" />
          </Tabs>
        </Box>

        {/* Forms */}
        <Box sx={{ p: { xs: 2, sm: 4 } }}>
          {activeTab === 0 ? (
            <LoginForm onSwitchToSignup={() => setActiveTab(1)} />
          ) : (
            <SignupForm onSwitchToLogin={() => setActiveTab(0)} />  // <-- corrected
          )}
        </Box>
      </Paper>

      {/* snackbar for signup success */}
      <Snackbar
        open={snackbarOpen}
        message="Signup complete! Please sign in."
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      />
    </Container>
  );
};

export default AuthPage;
