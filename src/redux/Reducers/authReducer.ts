import axios from 'axios'
import { authAPI, ErrorType, RequestResultsType } from 'api/todolist-api'
import { LoginParamsType } from 'components/Login/Login'
import { handleServerError, handleServerNetworkError } from 'utils/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppDispatchType, AppThunk } from 'components/App/redux-store'
import { appActions } from 'redux/Reducers/appReducer'
import { todolistsActions } from 'redux/Reducers/todolistsReducer'

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
  async (dispatch: AppDispatchType) => {
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

export const logOutTC = (): AppThunk => async (dispatch: AppDispatchType) => {
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

export const meTC = (): AppThunk => async (dispatch: AppDispatchType) => {
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
