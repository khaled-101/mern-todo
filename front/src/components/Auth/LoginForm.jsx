// src/components/Auth/LoginForm.jsx
import React, { useState, useEffect } from 'react';
import {
  TextField,
  Button,
  Typography,
  Box,
  Grid,
  InputAdornment,
  IconButton,
  FormControlLabel,
  Checkbox
} from '@mui/material';
import {
  Lock as LockIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import { useDispatch, useSelector } from 'react-redux';
import { loginUser, clearError } from '../../Redux/authSlice';
import { useNavigate } from 'react-router-dom';

const LoginForm = ({ onSwitchToSignup }) => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { status, error, token } = useSelector(state => state.auth);

  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
    remember: false
  });
  const [validationErrors, setValidationErrors] = useState({});

  // Redirect when login succeeded
  useEffect(() => {
    if (token) {
      navigate('/'); // or your dashboard route
    }
  }, [token, navigate]);

  // Clear slice error if user navigates away or re-renders form
  useEffect(() => {
    return () => {
      dispatch(clearError());
    };
  }, [dispatch]);

  const handleChange = e => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (validationErrors[name]) {
      setValidationErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const handleTogglePassword = () => {
    setFormData(prev => ({ ...prev, showPassword: !prev.showPassword }));
  };

  const validate = () => {
    const errs = {};
    if (!formData.email) errs.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email))
      errs.email = 'Invalid email format';
    if (!formData.password) errs.password = 'Password is required';
    return errs;
  };

  const handleSubmit = e => {
    e.preventDefault();
    const errs = validate();
    if (Object.keys(errs).length) {
      setValidationErrors(errs);
      return;
    }
    dispatch(
      loginUser({
        email: formData.email,
        password: formData.password,
        rememberMe: formData.remember
      })
    );
  };

  return (
    <Box component="form" onSubmit={handleSubmit} sx={{ width: '100%' }}>
      <Typography
        variant="h5"
        component="h2"
        align="center"
        gutterBottom
        color="primary"
        sx={{ mb: 3 }}
      >
        Welcome Back
      </Typography>

      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!validationErrors.email}
            helperText={validationErrors.email}
            variant="outlined"
            size="medium"
          />
        </Grid>

        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Password"
            name="password"
            type={formData.showPassword ? 'text' : 'password'}
            value={formData.password}
            onChange={handleChange}
            error={!!validationErrors.password}
            helperText={validationErrors.password}
            variant="outlined"
            size="medium"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleTogglePassword} edge="end">
                    {formData.showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              )
            }}
          />
        </Grid>

        <Grid item xs={12} sx={{ display: 'flex', justifyContent: 'space-between' }}>
          <FormControlLabel
            control={
              <Checkbox
                name="remember"
                checked={formData.remember}
                onChange={handleChange}
                color="primary"
              />
            }
            label="Remember me"
          />
        </Grid>

        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={status === 'loading'}
            startIcon={<LockIcon />}
            sx={{ py: 1.5, mt: 1 }}
          >
            {status === 'loading' ? 'Signing In...' : 'Sign In'}
          </Button>
        </Grid>

       <Grid item xs={12} sx={{ mt: 1 }}>
        <Typography variant="body2" align="center">
          Don't have an account?{' '}
          <Button
            color="secondary"
            onClick={() => navigate('/signup')}  // ← new navigation
            sx={{ textTransform: 'none', fontWeight: 'bold' }}
          >
            Sign up
          </Button>
        </Typography>
      </Grid>
        {error && (
          <Grid item xs={12}>
            <Typography
              variant="body2"
              align="center"
              color="error.main"
              sx={{ mt: 1 }}
            >
              {error}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default LoginForm;
