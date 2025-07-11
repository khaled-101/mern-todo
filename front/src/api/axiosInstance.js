// src/api/axiosInstance.js
import axios from 'axios';
import { store } from '../Redux/store';  // make sure this path is correct

const axiosInstance = axios.create({
  baseURL: 'http://localhost:5000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor to inject token
axiosInstance.interceptors.request.use(
  config => {
    const { auth: { token } } = store.getState();
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  error => Promise.reject(error)
);

export default axiosInstance;
