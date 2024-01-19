import {handleServerError} from 'common/utils/handleServerError'
import {createSlice} from '@reduxjs/toolkit'
import {appActions} from 'features/App/appReducer'
import {todolistsActions} from 'features/TodolistsList/Todolist/todolistsReducer'
import {handleServerNetworkError} from 'common/utils/handleServerNetworkError'
import {authAPI, LoginParamsType} from 'features/auth/authApi'
import {RequestResultsType} from 'common/enums'
import {createAppAsyncThunk} from "common/utils";
import {thunkTryCatch} from "common/utils/thunkTryCatch";

const slice = createSlice({
  name: 'auth', initialState: {
    isLoggedIn: false,
  }, reducers: {},
  extraReducers: builder => {
    builder
      .addCase(login.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(logout.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
      .addCase(initializeApp.fulfilled, (state, action) => {
        state.isLoggedIn = action.payload.isLoggedIn
      })
  }
})


// thunks

const login = createAppAsyncThunk<{ isLoggedIn: boolean }, LoginParamsType>('auth/login', async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await authAPI.login(arg)
    if (res.data.resultCode === RequestResultsType.OK) {
      return {isLoggedIn: true}
    } else {
      const isShowAppError = !res.data.fieldsErrors.length
      handleServerError(dispatch, res.data, isShowAppError)
      return rejectWithValue(res.data)
    }
  })
})


const logout = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>('auth/logout', async (_, {
  dispatch, rejectWithValue
}) => {
  try {
    dispatch(appActions.setAppLoadingStatus({status: 'loading'}))
    const res = await authAPI.logOut()
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(todolistsActions.clearData())
      dispatch(appActions.setAppLoadingStatus({status: 'succeeded'}))
      return {isLoggedIn: false}
    } else {
      handleServerError(dispatch, res.data)
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e)
    return rejectWithValue(null)
  }
})


const initializeApp = createAppAsyncThunk<{ isLoggedIn: boolean }, undefined>("app/initializeApp", async (_, {dispatch, rejectWithValue}) => {
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === 0) {
      return {isLoggedIn: true}
    } else {
      return rejectWithValue(null)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppInitializing({isInitialized: true}))
  }
})


export const authReducer = slice.reducer
export const authActions = slice.actions
export const authThunks = {login, logout, initializeApp}

