import React, { useState } from 'react';
import { 
  TextField, 
  Button, 
  Typography, 
  Box, 
  Grid,
  InputAdornment,
  IconButton,
  LinearProgress
} from '@mui/material';
import { 
  Lock as LockIcon,
  Person as PersonIcon,
  Visibility,
  VisibilityOff
} from '@mui/icons-material';
import axiosInstance from '../../api/axiosInstance';

const SignupForm = ({ onSwitchToLogin }) => {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    showPassword: false,
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [passwordStrength, setPasswordStrength] = useState(0);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData({ ...formData, [name]: value });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
    
    if (name === 'password') {
      let strength = 0;
      if (value.length >= 8) strength += 1;
      if (/[A-Z]/.test(value)) strength += 1;
      if (/[0-9]/.test(value)) strength += 1;
      if (/[^A-Za-z0-9]/.test(value)) strength += 1;
      setPasswordStrength(strength);
    }
  };

  const handleTogglePassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.username.trim()) newErrors.username = 'Username is required';
    if (!formData.email) {
      newErrors.email = 'Email is required';
    } else if (!/\S+@\S+\.\S+/.test(formData.email)) {
      newErrors.email = 'Invalid email format';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    } else if (formData.password.length < 8) {
      newErrors.password = 'Password must be at least 8 characters';
    }
    return newErrors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setMessage('');
    const validationErrors = validate();
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    
    setIsSubmitting(true);
    try {
      await axiosInstance.post('/users/register', {
        username: formData.username,
        email: formData.email,
        password: formData.password
      });
      setMessage('Signup successful! Please log in.');
      setFormData({ username: '', email: '', password: '' });
    } catch (error) {
      setMessage(error.response?.data?.message || 'Signup failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  const strengthColors = {
    0: 'error',
    1: 'error',
    2: 'warning',
    3: 'info',
    4: 'success'
  };
  
  const strengthText = [
    'Very Weak',
    'Weak',
    'Medium',
    'Strong',
    'Very Strong'
  ];

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
        Create Your Account
      </Typography>
      
      <Grid container spacing={2}>
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Username"
            name="username"
            value={formData.username}
            onChange={handleChange}
            error={!!errors.username}
            helperText={errors.username}
            variant="outlined"
            size="medium"
            InputProps={{
              startAdornment: (
                <InputAdornment position="start">
                  <PersonIcon color="action" />
                </InputAdornment>
              )
            }}
          />
        </Grid>
        
        <Grid item xs={12}>
          <TextField
            fullWidth
            label="Email"
            name="email"
            type="email"
            value={formData.email}
            onChange={handleChange}
            error={!!errors.email}
            helperText={errors.email}
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
            error={!!errors.password}
            helperText={errors.password}
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
          
          {formData.password && (
            <Box sx={{ mt: 1 }}>
              <LinearProgress 
                variant="determinate" 
                value={(passwordStrength + 1) * 25} 
                color={strengthColors[passwordStrength] || 'primary'} 
                sx={{ height: 8, borderRadius: 4 }}
              />
              <Typography variant="caption" color="text.secondary">
                Strength: <Typography 
                  component="span" 
                  color={`${strengthColors[passwordStrength]}.main`} 
                  fontWeight="bold"
                >
                  {strengthText[passwordStrength]}
                </Typography>
              </Typography>
            </Box>
          )}
        </Grid>
        
        <Grid item xs={12}>
          <Button
            fullWidth
            variant="contained"
            color="primary"
            size="large"
            type="submit"
            disabled={isSubmitting}
            startIcon={<LockIcon />}
            sx={{ py: 1.5, mt: 1 }}
          >
            {isSubmitting ? 'Creating Account...' : 'Sign Up'}
          </Button>
        </Grid>
        
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Typography variant="body2" align="center">
            Already have an account?{' '}
            <Button 
              color="secondary" 
              onClick={onSwitchToLogin}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Sign in
            </Button>
          </Typography>
        </Grid>
        
        {message && (
          <Grid item xs={12}>
            <Typography 
              variant="body2" 
              align="center" 
              color={message.includes('successful') ? 'success.main' : 'error.main'}
              sx={{ mt: 1 }}
            >
              {message}
            </Typography>
          </Grid>
        )}
      </Grid>
    </Box>
  );
};

export default SignupForm;