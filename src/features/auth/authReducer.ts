import axios from 'axios'
import { handleServerError } from 'common/utils/handleServerError'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { appActions } from 'features/App/appReducer'
import { todolistsActions } from 'features/TodolistsList/Todolist/todolistsReducer'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { LoginParamsType } from 'features/auth/Login'
import { AppThunk } from 'features/App/store'
import { ErrorType } from 'common/types/appTypes'
import { authAPI } from 'features/auth/authApi'
import { RequestResultsType } from 'common/enums'

const slice = createSlice({
  name: 'auth',
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state, action: PayloadAction<{ isLoggedIn: boolean }>) => {
      state.isLoggedIn = action.payload.isLoggedIn
    },
  },
})

// thunks
export const loginTC =
  (payLoad: LoginParamsType): AppThunk =>
  async (dispatch) => {
    dispatch(appActions.setAppLoadingStatus({ status: 'loading' }))
    try {
      const res = await authAPI.login(payLoad)
      if (res.data.resultCode === RequestResultsType.OK) {
        dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
        dispatch(appActions.setAppLoadingStatus({ status: 'succeeded' }))
      } else {
        handleServerError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        const errorMessage = e.response ? e.response.data.message : e.message
        handleServerNetworkError(dispatch, errorMessage)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }

export const logOutTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppLoadingStatus({ status: 'loading' }))
  try {
    const res = await authAPI.logOut()
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: false }))
      dispatch(todolistsActions.clearData())
      dispatch(appActions.setAppLoadingStatus({ status: 'succeeded' }))
    } else {
      handleServerError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const errorMessage = e.response ? e.response.data.message : e.message
      handleServerNetworkError(dispatch, errorMessage)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}

export const meTC = (): AppThunk => async (dispatch) => {
  dispatch(appActions.setAppLoadingStatus({ status: 'loading' }))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
      dispatch(appActions.setAppLoadingStatus({ status: 'succeeded' }))
    } else {
      handleServerError(dispatch, res.data)
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const errorMessage = e.response ? e.response.data.message : e.message
      handleServerNetworkError(dispatch, errorMessage)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  } finally {
    dispatch(appActions.setAppInitializing({ isInitialized: true }))
  }
}

export const authReducer = slice.reducer
export const authActions = slice.actions

export type AuthInitialStateType = ReturnType<typeof slice.getInitialState>
