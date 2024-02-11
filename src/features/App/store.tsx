import { todolistsReducer } from 'features/TodolistsList/Todolist/model/todolistsReducer'
import { tasksReducer } from 'features/TodolistsList/Todolist/Task/model/tasksReducer'
import { appReducer } from 'features/App/model/appReducer'
import { authReducer } from 'features/auth/model/authReducer'
import { configureStore } from '@reduxjs/toolkit'

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
