import { AnyAction, combineReducers } from 'redux'
import { todolistsReducer } from 'features/TodolistsList/Todolist/todolistsReducer'
import { tasksReducer } from 'features/TodolistsList/Todolist/Task/tasksReducer'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { appReducer } from 'features/App/appReducer'
import { authReducer } from 'features/auth/authReducer'
import { configureStore } from '@reduxjs/toolkit'

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer,
})

export const store = configureStore({
  reducer: rootReducer,
})

//@ts-ignore
window.store = store

export type AppDispatchType = ThunkDispatch<AppRootStateType, unknown, AnyAction>
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
