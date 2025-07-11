// src/pages/TodoListPage.jsx
import React, { useState, useEffect } from 'react';
import {
  Box,
  TextField,
  Button,
  Grid,
  Card,
  CardContent,
  CardActions,
  Chip,
  Typography,
  MenuItem
} from '@mui/material';
import SearchIcon from '@mui/icons-material/Search';
import AddIcon from '@mui/icons-material/Add';
import { useSelector, useDispatch } from 'react-redux';
import { fetchTasks, addTask, deleteTask } from '../Redux/taskSlice';
import NavBar from '../components/Navbar/NavBar';
import { useNavigate } from 'react-router-dom';

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
    sx={{ mb: 2 }}
  />
);

// “Add a Task” trigger box
const AddTaskTrigger = ({ onClick }) => (
  <Box
    onClick={onClick}
    sx={{
      border: '1px dashed gray',
      borderRadius: 1,
      p: 2,
      display: 'flex',
      alignItems: 'center',
      cursor: 'pointer',
      mb: 2
    }}
  >
    <AddIcon sx={{ mr: 1 }} color="action" />
    <Typography variant="body1">Add a Task</Typography>
  </Box>
);

// Form for adding a new task
const AddTaskForm = ({ task, onChange, onCancel, onSave }) => (
  <Card sx={{ mb: 2 }}>
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
    <CardActions sx={{ justifyContent: 'flex-end' }}>
      <Button onClick={onCancel} color="error">Cancel</Button>
      <Button onClick={onSave} variant="contained">Save</Button>
    </CardActions>
  </Card>
);

// Single task item with edit/delete
const TaskItem = ({ task, onDelete }) => {
  const navigate = useNavigate();
  return (
    <Card
      variant="outlined"
      sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', p: 1 }}
    >
      <Box sx={{ flexGrow: 1 }}>
        <Typography variant="subtitle1">{task.name}</Typography>
        <Typography variant="body2" color="text.secondary">{task.desc}</Typography>
      </Box>
      <Chip
        label={
          task.type === 'notstarted'
            ? 'Not Started'
            : task.type.charAt(0).toUpperCase() + task.type.slice(1)
        }
        color={
          task.type === 'done'
            ? 'success'
            : task.type === 'ongoing'
            ? 'primary'
            : 'default'
        }
        sx={{ mr: 2 }}
      />
      <Button onClick={() => navigate(`/tasks/edit/${task._id}`)}>Edit</Button>
      <Button color="error" onClick={() => onDelete(task._id)}>Delete</Button>
    </Card>
  );
};

// List of tasks
const TaskList = ({ tasks, onDelete }) => (
  <Grid container spacing={2}>
    {tasks.map(t => (
      <Grid item xs={12} key={t._id}>
        <TaskItem task={t} onDelete={onDelete} />
      </Grid>
    ))}
  </Grid>
);

// Main page component
const TodoListPage = () => {
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
      <Box sx={{ p: 2 }}>
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
        <TaskList tasks={filteredTasks} onDelete={handleDelete} />
      </Box>
    </>
  );
};

export default TodoListPage;
