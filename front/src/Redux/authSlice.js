// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../api/axiosInstance'

// Inline storage helpers
const getStoredToken = () => {
  return localStorage.getItem('jwtToken') || sessionStorage.getItem('jwtToken') || null
}

const storeToken = (token, rememberMe) => {
  if (rememberMe) localStorage.setItem('jwtToken', token)
  else sessionStorage.setItem('jwtToken', token)
}

const removeToken = () => {
  localStorage.removeItem('jwtToken')
  sessionStorage.removeItem('jwtToken')
}

// Thunks for registering and logging in
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/register', { username, email, password })
      storeToken(data.token, rememberMe)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', { email, password })
      storeToken(data.token, rememberMe)
      return data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Initial state with token from storage
const initialState = {
  token: getStoredToken(),
  user: null,
  status: 'idle',
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Rehydrate session from storage
    restoreSession(state) {
      state.token = getStoredToken()
    },
    logout(state) {
      state.token = null
      state.user = null
      removeToken()
      state.status = 'idle'
      state.error = null
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      .addCase(registerUser.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.token = payload.token
        state.user = { _id: payload._id, username: payload.username, email: payload.email }
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })
      .addCase(loginUser.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.token = payload.token
        state.user = { _id: payload._id, username: payload.username, email: payload.email }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error = payload
      })
  }
})

export const { restoreSession, logout, clearError } = authSlice.actions
export default authSlice.reducer
