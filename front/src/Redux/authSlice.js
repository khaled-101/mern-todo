// src/redux/slices/authSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../api/axiosInstance'

const STORAGE_KEY = 'auth'

// Retrieve both token and user from storage
const getStoredAuth = () => {
  const raw = localStorage.getItem(STORAGE_KEY)
            || sessionStorage.getItem(STORAGE_KEY)
  if (!raw) return { token: null, user: null }
  try {
    return JSON.parse(raw)
  } catch {
    return { token: null, user: null }
  }
}

// Persist token and user together
const storeAuth = (token, user, rememberMe) => {
  const payload = JSON.stringify({ token, user })
  if (rememberMe) localStorage.setItem(STORAGE_KEY, payload)
  else           sessionStorage.setItem(STORAGE_KEY, payload)
}

// Remove both token and user from storage
const removeAuth = () => {
  localStorage.removeItem(STORAGE_KEY)
  sessionStorage.removeItem(STORAGE_KEY)
}

// Thunk: register a new user
export const registerUser = createAsyncThunk(
  'auth/registerUser',
  async ({ username, email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/register', { username, email, password })
      // Persist token + user
      storeAuth(
        data.token,
        { _id: data._id, username: data.username, email: data.email },
        rememberMe
      )
      return data
    } catch (err) {
      const message = err.response?.data?.message || err.message
      return rejectWithValue(message)
    }
  }
)

// Thunk: log in an existing user
export const loginUser = createAsyncThunk(
  'auth/loginUser',
  async ({ email, password, rememberMe }, { rejectWithValue }) => {
    try {
      const { data } = await axios.post('/users/login', { email, password })
      // Persist token + user
      storeAuth(
        data.token,
        { _id: data._id, username: data.username, email: data.email },
        rememberMe
      )
      return data
    } catch (err) {
      const message = err.response?.data?.message || err.message
      return rejectWithValue(message)
    }
  }
)

// Initialize state from storage
const { token: storedToken, user: storedUser } = getStoredAuth()
const initialState = {
  token: storedToken,
  user: storedUser,
  status: 'idle',
  error: null
}

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    // Rehydrate both token & user on app load
    restoreSession(state) {
      const { token, user } = getStoredAuth()
      state.token = token
      state.user  = user
    },
    // Clear auth data
    logout(state) {
      state.token  = null
      state.user   = null
      state.status = 'idle'
      state.error  = null
      removeAuth()
    },
    clearError(state) {
      state.error = null
    }
  },
  extraReducers: builder => {
    builder
      // register flow
      .addCase(registerUser.pending, state => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(registerUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.token  = payload.token
        state.user   = { _id: payload._id, username: payload.username, email: payload.email }
      })
      .addCase(registerUser.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error  = payload
      })
      // login flow
      .addCase(loginUser.pending, state => {
        state.status = 'loading'
        state.error  = null
      })
      .addCase(loginUser.fulfilled, (state, { payload }) => {
        state.status = 'succeeded'
        state.token  = payload.token
        state.user   = { _id: payload._id, username: payload.username, email: payload.email }
      })
      .addCase(loginUser.rejected, (state, { payload }) => {
        state.status = 'failed'
        state.error  = payload
      })
  }
})

export const { restoreSession, logout, clearError } = authSlice.actions
export default authSlice.reducer
