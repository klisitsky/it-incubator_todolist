import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { AppThunk } from 'features/App/store'
import { authAPI } from 'features/auth/authApi'
import { authActions } from 'features/auth/authReducer'

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null as null | string,
    status: 'idle' as RequestStatusType,
    isInitialized: false,
  },
  reducers: {
    setAppLoadingStatus: (state, action: PayloadAction<{ status: RequestStatusType }>) => {
      state.status = action.payload.status
    },
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
    setAppInitializing: (state, action: PayloadAction<{ isInitialized: boolean }>) => {
      state.isInitialized = action.payload.isInitialized
    },
  },
})

export const initializeAppTC = (): AppThunk => (dispatch) => {
  authAPI.me().then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(authActions.setIsLoggedIn({ isLoggedIn: true }))
    }
    dispatch(appActions.setAppInitializing({ isInitialized: true }))
  })
}

export const appReducer = slice.reducer
export const appActions = slice.actions

export type AppInitialStateType = ReturnType<typeof slice.getInitialState>

export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'
