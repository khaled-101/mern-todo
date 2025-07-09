import React, { useState } from 'react';
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
import axiosInstance from '../../api/axiosInstance';

const LoginForm = ({ onSwitchToSignup }) => {
  const [formData, setFormData] = useState({
    email: '',
    password: '',
    showPassword: false,
    remember: false
  });
  const [message, setMessage] = useState('');
  const [errors, setErrors] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData({ 
      ...formData, 
      [name]: type === 'checkbox' ? checked : value 
    });
    
    if (errors[name]) {
      setErrors({ ...errors, [name]: '' });
    }
  };

  const handleTogglePassword = () => {
    setFormData({ ...formData, showPassword: !formData.showPassword });
  };

  const validate = () => {
    const newErrors = {};
    if (!formData.email) newErrors.email = 'Email is required';
    else if (!/\S+@\S+\.\S+/.test(formData.email)) newErrors.email = 'Invalid email format';
    if (!formData.password) newErrors.password = 'Password is required';
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
      const response = await axiosInstance.post('/users/login', {
        email: formData.email,
        password: formData.password
      });
      localStorage.setItem('token', response.data.token);
      setMessage('Login successful.');
    } catch (error) {
      setMessage(error.response?.data?.message || 'Login failed. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
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
            disabled={isSubmitting}
            startIcon={<LockIcon />}
            sx={{ py: 1.5, mt: 1 }}
          >
            {isSubmitting ? 'Signing In...' : 'Sign In'}
          </Button>
        </Grid>
        
        <Grid item xs={12} sx={{ mt: 1 }}>
          <Typography variant="body2" align="center">
            Don't have an account?{' '}
            <Button 
              color="secondary" 
              onClick={onSwitchToSignup}
              sx={{ textTransform: 'none', fontWeight: 'bold' }}
            >
              Sign up
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

export default LoginForm;