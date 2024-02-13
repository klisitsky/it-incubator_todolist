import { createSlice, isFulfilled } from '@reduxjs/toolkit'
import { todolistsActions } from 'features/TodolistsList/Todolist/model/todolistsSlice'
import { authAPI, LoginParams } from 'features/auth/api/authApi'
import { RequestResults } from 'common/enums'
import { createAppAsyncThunk } from 'common/utils'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder.addMatcher(isFulfilled(login, logout, initializeApp), (state, action) => {
      state.isLoggedIn = action.payload.isLoggedIn
    })
  },
})

// thunks

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParams>(
  'auth/login',
  async (arg, { rejectWithValue }) => {
    const res = await authAPI.login(arg)
    if (res.data.resultCode === RequestResults.OK) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  'auth/logout',
  async (_, { dispatch, rejectWithValue }) => {
    const res = await authAPI.logOut()
    if (res.data.resultCode === RequestResults.OK) {
      dispatch(todolistsActions.clearData())
      return { isLoggedIn: false }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>(
  'auth/initializeApp',
  async (_, { rejectWithValue }) => {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      return { isLoggedIn: true }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const authSlice = slice.reducer
export const authThunks = { login, logout, initializeApp }
