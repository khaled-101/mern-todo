// src/pages/TodoListPage.jsx
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';  
import {
  Container,
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Typography,
  MenuItem,
  Avatar,
  useTheme
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import ChecklistIcon from '@mui/icons-material/Checklist';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, addTask, deleteTask } from '../Redux/taskSlice';
import NavBar from '../components/Navbar/NavBar';
import { useNavigate } from 'react-router-dom';
import { keyframes } from '@emotion/react';

// Floating animation
const float = keyframes`
  0% { transform: translateY(0px); }
  50% { transform: translateY(-10px); }
  100% { transform: translateY(0px); }
`;

// Search bar component
const SearchBar = ({ value, onChange }) => (
  <TextField
    fullWidth
    placeholder="Search tasks..."
    value={value}
    onChange={onChange}
    InputProps={{
      startAdornment: <SearchIcon color="action" sx={{ mr: 1 }} />
    }}
    sx={{ 
      mb: 2,
      '& .MuiOutlinedInput-root': {
        borderRadius: 2,
        boxShadow: '0 4px 6px rgba(0,0,0,0.1)',
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
);

// “Add a Task” trigger box
const AddTaskTrigger = ({ onClick }) => {
  const theme = useTheme();
  
  return (
    <Box
      onClick={onClick}
      sx={{
        borderRadius: 2,
        p: 3,
        display: 'flex',
        alignItems: 'center',
        cursor: 'pointer',
        mb: 3,
        background: `linear-gradient(135deg, ${theme.palette.primary.light} 0%, ${theme.palette.primary.dark} 100%)`,
        color: 'white',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 20px rgba(0,0,0,0.15)',
        '&:hover': {
          transform: 'translateY(-3px)',
          boxShadow: '0 8px 25px rgba(0,0,0,0.2)',
        }
      }}
    >
      <Avatar sx={{ 
        bgcolor: 'secondary.main', 
        mr: 2,
        width: 50, 
        height: 50, 
        animation: `${float} 3s ease-in-out infinite`,
        boxShadow: '0 5px 15px rgba(0,0,0,0.2)',
        transition: 'all 0.3s ease',
        '&:hover': {
          transform: 'rotate(15deg) scale(1.1)',
          boxShadow: '0 8px 20px rgba(0,0,0,0.3)',
        }
      }}>
        <AddIcon fontSize="large" />
      </Avatar>
      <Typography variant="h6">Add a New Task</Typography>
    </Box>
  );
};

// Form for adding a new task
const AddTaskForm = ({ task, onChange, onCancel, onSave }) => {
  const theme = useTheme();
  
  return (
    <Card sx={{ 
      mb: 3, 
      borderRadius: 2,
      overflow: 'hidden',
      transform: 'scale(1.02)',
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
    }}>
      <CardContent>
        <TextField
          fullWidth
          label="Task Name"
          name="name"
          value={task.name}
          onChange={e => onChange('name', e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          fullWidth
          label="Description"
          name="desc"
          multiline
          rows={3}
          value={task.desc}
          onChange={e => onChange('desc', e.target.value)}
          sx={{ mb: 2 }}
        />
        <TextField
          select
          fullWidth
          label="Status"
          name="type"
          value={task.type}
          onChange={e => onChange('type', e.target.value)}
        >
          <MenuItem value="notstarted">Not Started</MenuItem>
          <MenuItem value="ongoing">Ongoing</MenuItem>
          <MenuItem value="done">Done</MenuItem>
        </TextField>
      </CardContent>
      <CardActions sx={{ justifyContent: 'flex-end', p: 2 }}>
        <Button 
          onClick={onCancel} 
          variant="outlined"
          sx={{
            fontWeight: 600,
            letterSpacing: 0.5,
            borderWidth: 2,
            '&:hover': {
              borderWidth: 2,
            }
          }}
        >
          Cancel
        </Button>
        <Button 
          onClick={onSave} 
          variant="contained"
          sx={{
            fontWeight: 600,
            letterSpacing: 0.5,
            boxShadow: `0 4px 10px ${theme.palette.primary.light}`,
            '&:hover': {
              transform: 'translateY(-2px)',
              boxShadow: `0 6px 14px ${theme.palette.primary.light}`,
            }
          }}
        >
          Save Task
        </Button>
      </CardActions>
    </Card>
  );
};

// Single task item with edit/delete
const TaskItem = ({ task, onDelete }) => {
  const theme = useTheme();
  const navigate = useNavigate();
  
  return (
    <Card
      variant="outlined"
      sx={{ 
        mb: 2,
        borderRadius: 2,
        overflow: 'hidden',
        transform: 'scale(1)',
        transition: 'all 0.3s ease',
        boxShadow: '0 4px 15px rgba(0,0,0,0.08)',
        position: 'relative',
        '&:hover': {
          transform: 'translateY(-5px)',
          boxShadow: `0 8px 25px rgba(0,0,0,0.15), 0 0 10px ${theme.palette.primary.light}`,
        },
        '&:before': {
          content: '""',
          position: 'absolute',
          top: 0,
          left: 0,
          width: 4,
          height: '100%',
          background: task.type === 'done'
            ? theme.palette.success.main
            : task.type === 'ongoing'
            ? theme.palette.primary.main
            : theme.palette.grey[500],
        }
      }}
    >
      <Box sx={{ 
        display: 'flex', 
        justifyContent: 'space-between', 
        alignItems: 'center', 
        p: 2,
        background: 'rgba(255, 255, 255, 0.95)',
      }}>
        <Box sx={{ flexGrow: 1, pr: 2 }}>
          <Typography variant="subtitle1" sx={{ fontWeight: 600 }}>{task.name}</Typography>
          <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>{task.desc}</Typography>
        </Box>
        <Box sx={{ display: 'flex', alignItems: 'center' }}>
          <Chip
            label={
              task.type === 'notstarted'
                ? 'Not Started'
                : task.type.charAt(0).toUpperCase() + task.type.slice(1)
            }
            sx={{ 
              mr: 2,
              fontWeight: 600,
              color: 'white',
              backgroundColor: task.type === 'done'
                ? theme.palette.success.main
                : task.type === 'ongoing'
                ? theme.palette.primary.main
                : theme.palette.grey[500],
              boxShadow: '0 2px 4px rgba(0,0,0,0.1)'
            }}
          />
          <Button 
             component={Link}
            to={`/tasks/edit/${task._id}`}
           variant="outlined"
            sx={{ 
              mr: 1,
              fontWeight: 600,
              letterSpacing: 0.5,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              }
            }}
          >
            Edit
          </Button>
          <Button 
            variant="outlined"
            color="error"
            onClick={() => onDelete(task._id)}
            sx={{ 
              fontWeight: 600,
              letterSpacing: 0.5,
              borderWidth: 2,
              '&:hover': {
                borderWidth: 2,
              }
            }}
          >
            Delete
          </Button>
        </Box>
      </Box>
    </Card>
  );
};

// Main page component
const TodoListPage = () => {
  const theme = useTheme();
  const dispatch = useDispatch();
  const tasks = useSelector(state => state.tasks.items || []);
  const [searchTerm, setSearchTerm] = useState('');
  const [showAddForm, setShowAddForm] = useState(false);
  const [newTask, setNewTask] = useState({ name: '', desc: '', type: 'notstarted' });

  useEffect(() => {
    dispatch(fetchTasks());
  }, [dispatch]);

  const handleChange = (field, value) => {
    setNewTask(prev => ({ ...prev, [field]: value }));
  };
  const handleSearchChange = e => setSearchTerm(e.target.value);
  const handleAddClick = () => setShowAddForm(true);
  const handleCancel = () => {
    setShowAddForm(false);
    setNewTask({ name: '', desc: '', type: 'notstarted' });
  };
  const handleSave = () => {
    if (newTask.name.trim()) {
      dispatch(addTask(newTask));
      handleCancel();
    }
  };
  const handleDelete = id => dispatch(deleteTask(id));

  const filteredTasks = tasks.filter(t =>
    t.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <>
      <NavBar />
      <Container maxWidth="md" sx={{ py: 4 }}>
        <Box sx={{ 
          textAlign: 'center', 
          mb: 4,
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center'
        }}>
          <Avatar sx={{ 
            bgcolor: 'secondary.main', 
            mr: 2,
            width: 60, 
            height: 60, 
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
          <Typography variant="h4" component="h1" sx={{ 
            fontWeight: 700,
            letterSpacing: 1,
            textShadow: '0 2px 4px rgba(0,0,0,0.1)',
          }}>
            TaskMaster Pro
          </Typography>
        </Box>
        
        <Box sx={{ 
          borderRadius: 2,
          p: { xs: 2, md: 4 },
          background: 'rgba(255, 255, 255, 0.85)',
          backdropFilter: 'blur(10px)',
          boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
          border: '1px solid rgba(255, 255, 255, 0.5)',
        }}>
          <SearchBar value={searchTerm} onChange={handleSearchChange} />
          {!showAddForm && <AddTaskTrigger onClick={handleAddClick} />}
          {showAddForm && (
            <AddTaskForm
              task={newTask}
              onChange={handleChange}
              onCancel={handleCancel}
              onSave={handleSave}
            />
          )}
          
          {filteredTasks.length > 0 ? (
            <Box sx={{ mt: 3 }}>
              <Typography variant="h6" sx={{ mb: 2, fontWeight: 600, color: 'text.secondary' }}>
                Your Tasks ({filteredTasks.length})
              </Typography>
              {filteredTasks.map(t => (
                <TaskItem key={t._id} task={t} onDelete={handleDelete} />
              ))}
            </Box>
          ) : (
            <Box sx={{ 
              textAlign: 'center', 
              py: 4,
              borderRadius: 2,
              background: 'rgba(245, 245, 245, 0.7)',
              mt: 2
            }}>
              <Typography variant="h6" sx={{ color: 'text.secondary' }}>
                {searchTerm ? 'No tasks match your search' : 'No tasks yet. Add your first task!'}
              </Typography>
            </Box>
          )}
        </Box>
      </Container>
    </>
  );
};

export default TodoListPage;