// src/redux/slices/taskSlice.js
import { createSlice, createAsyncThunk } from '@reduxjs/toolkit'
import axios from '../api/axiosInstance'

// Thunk: fetch tasks for the logged-in user
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get('/tasks')
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Thunk: add a new task
export const addTask = createAsyncThunk(
  'tasks/addTask',
  async (taskData, { rejectWithValue }) => {
    try {
      const response = await axios.post('/tasks', taskData)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Thunk: update an existing task
export const updateTask = createAsyncThunk(
  'tasks/updateTask',
  async ({ id, ...updates }, { rejectWithValue }) => {
    try {
      const response = await axios.put(`/tasks/${id}`, updates)
      return response.data
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Thunk: delete a task
export const deleteTask = createAsyncThunk(
  'tasks/deleteTask',
  async (id, { rejectWithValue }) => {
    try {
      await axios.delete(`/tasks/${id}`)
      return id
    } catch (err) {
      return rejectWithValue(err.response?.data?.message || err.message)
    }
  }
)

// Initial state
const initialState = {
  items: [],
  status: 'idle',   // 'idle' | 'loading' | 'succeeded' | 'failed'
  error: null
}

const taskSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: builder => {
    builder
      // fetchTasks
      .addCase(fetchTasks.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = action.payload
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // addTask
      .addCase(addTask.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(addTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items.push(action.payload)
      })
      .addCase(addTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // updateTask
      .addCase(updateTask.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(updateTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        const index = state.items.findIndex(t => t._id === action.payload._id)
        if (index !== -1) {
          state.items[index] = action.payload
        }
      })
      .addCase(updateTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
      // deleteTask
      .addCase(deleteTask.pending, state => {
        state.status = 'loading'
        state.error = null
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        state.status = 'succeeded'
        state.items = state.items.filter(t => t._id !== action.payload)
      })
      .addCase(deleteTask.rejected, (state, action) => {
        state.status = 'failed'
        state.error = action.payload
      })
  }
})

export default taskSlice.reducer
