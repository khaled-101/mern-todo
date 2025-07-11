// src/pages/EditTaskPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Container,
  Paper,
  Box,
  Typography,
  TextField,
  Button,
  Grid,
  MenuItem,
  Avatar,
  useTheme
} from '@mui/material';
import { useParams, useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { fetchTasks, updateTask } from '../Redux/taskSlice';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { keyframes } from '@emotion/react';

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-5px); }
  100% { transform: translateY(0px); }
`;

export default function EditTaskPage() {
  const theme = useTheme();
  const { id } = useParams();
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const tasks = useSelector(state => state.tasks.items || []);
  const existingTask = tasks.find(t => t._id === id);

  const [form, setForm] = useState({ name: '', desc: '', type: 'notstarted' });

  useEffect(() => {
    if (!existingTask) {
      dispatch(fetchTasks());
    } else {
      setForm({ name: existingTask.name, desc: existingTask.desc, type: existingTask.type });
    }
  }, [existingTask, dispatch]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(f => ({ ...f, [name]: value }));
  };

  const handleCancel = () => navigate('/tasks');
  const handleSave = () => {
    dispatch(updateTask({ id, ...form }));
    navigate('/tasks');
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
          boxShadow: `0 25px 50px -12px rgba(0, 0, 0, 0.15), 0 0 15px ${theme.palette.primary.light}`,
          position: 'relative',
          '&:before': {
            content: '""',
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            height: 4,
            background: `linear-gradient(90deg, ${theme.palette.secondary.main}, ${theme.palette.primary.main})`,
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
            Edit Task
          </Typography>
          <Typography variant="subtitle1" sx={{ 
            opacity: 0.9,
            mt: 1,
            zIndex: 1,
            position: 'relative'
          }}>
            Update your task details
          </Typography>
        </Box>

        {/* Form */}
        <Box sx={{ 
          p: { xs: 2, sm: 4 },
          background: 'rgba(255, 255, 255, 0.95)',
          backdropFilter: 'blur(5px)',
        }}>
          <Box component="form" noValidate autoComplete="off">
            {/* Task Name - Full Width */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Task Name"
                name="name"
                value={form.name}
                onChange={handleChange}
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
            
            {/* Description - Full Width */}
            <Box sx={{ mb: 3 }}>
              <TextField
                fullWidth
                label="Description"
                name="desc"
                multiline
                rows={4}
                value={form.desc}
                onChange={handleChange}
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
            
            {/* Status Selector */}
            <Box sx={{ mb: 4 }}>
              <TextField
                select
                fullWidth
                label="Status"
                name="type"
                value={form.type}
                onChange={handleChange}
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
              >
                <MenuItem value="notstarted">Not Started</MenuItem>
                <MenuItem value="ongoing">Ongoing</MenuItem>
                <MenuItem value="done">Done</MenuItem>
              </TextField>
            </Box>
            
            {/* Buttons - Cancel on left, Save on right */}
            <Box sx={{ display: 'flex', justifyContent: 'space-between' }}>
              <Button 
                onClick={handleCancel}
                variant="outlined"
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
                Cancel
              </Button>
              <Button 
                variant="contained"
                onClick={handleSave}
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
                Save Changes
              </Button>
            </Box>
          </Box>
        </Box>
      </Paper>
    </Container>
  );
}