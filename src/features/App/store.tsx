import {AnyAction} from 'redux'
import {todolistsReducer} from 'features/TodolistsList/Todolist/todolistsReducer'
import {tasksReducer} from 'features/TodolistsList/Todolist/Task/tasksReducer'
import {ThunkAction} from 'redux-thunk'
import {appReducer} from 'features/App/appReducer'
import {authReducer} from 'features/auth/authReducer'
import {configureStore} from '@reduxjs/toolkit'


export const store = configureStore({
  reducer: {
    todolists: todolistsReducer,
    tasks: tasksReducer,
    app: appReducer,
    auth: authReducer,
  },
})

//@ts-ignore
window.store = store

export type AppDispatchType = typeof store.dispatch
export type AppRootStateType = ReturnType<typeof store.getState>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
