// src/App.jsx
import React, { useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate, Link } from 'react-router-dom';
import { Provider, useSelector } from 'react-redux';
import { store } from './Redux/store';
import { restoreSession } from './Redux/authSlice';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import TodoListPage from './pages/TodoListPage';
import EditTaskPage from './pages/EditTaskPage';
import { Box, Typography, Button } from '@mui/material';

// 404 Not Found component
const NotFoundPage = () => (
  <Box sx={{ p: 4, textAlign: 'center' }}>
    <Typography variant="h3" gutterBottom>
      404 - Page Not Found
    </Typography>
    <Typography variant="body1" sx={{ mb: 2 }}>
      Sorry, the page you are looking for does not exist.
    </Typography>
    <Button variant="contained" component={Link} to="/login">
      Go to Login
    </Button>
  </Box>
);

// Protected route wrapper
const ProtectedRoute = ({ children }) => {
  const token = useSelector(state => state.auth.token);
  return token ? children : <Navigate to="/login" replace />;
};

function App() {
  useEffect(() => {
    store.dispatch(restoreSession());
  }, []);

  return (
    <Provider store={store}>
      <Router>
        <Routes>
          <Route path="/login"  element={<LoginPage  />} />
          <Route path="/signup" element={<SignupPage />} />
          <Route
            path="/tasks"
            element={
              <ProtectedRoute>
                <TodoListPage />
              </ProtectedRoute>
            }
          />
          <Route
            path="/tasks/edit/:id"
            element={
              <ProtectedRoute>
                <EditTaskPage />
              </ProtectedRoute>
            }
          />
          <Route path="/" element={<Navigate to="/tasks" replace />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Router>
    </Provider>
  );
}

export default App;
