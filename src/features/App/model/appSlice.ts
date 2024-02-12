import { AnyAction, createSlice, isAnyOf, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { authThunks } from 'features/auth/model/authSlice'

const slice = createSlice({
  name: 'app',
  initialState: {
    error: null as null | string,
    status: 'idle' as RequestStatus,
    isInitialized: false,
  },
  reducers: {
    setAppError: (state, action: PayloadAction<{ error: string | null }>) => {
      state.error = action.payload.error
    },
  },
  extraReducers: (builder) => {
    builder
      .addMatcher(isPending, (state) => {
        state.status = 'loading'
      })
      .addMatcher(isFulfilled, (state) => {
        state.status = 'succeeded'
      })
      .addMatcher(isRejected, (state, action: AnyAction) => {
        state.status = 'failed'
        if (
          action.type.includes('initializeApp') ||
          action.type.includes('createTodolist') ||
          action.type.includes('login') ||
          action.type.includes('createTask')
        )
          return
        if (action.payload) {
          state.error = action.payload.messages[0]
        } else {
          state.error = action.error.message
        }
      })
      .addMatcher(isAnyOf(authThunks.initializeApp.fulfilled, authThunks.initializeApp.rejected), (state) => {
        state.isInitialized = true
      })
  },
})

export const appSlice = slice.reducer
export const appActions = slice.actions

export type AppInitialStateType = ReturnType<typeof slice.getInitialState>

export type RequestStatus = 'idle' | 'loading' | 'succeeded' | 'failed'
