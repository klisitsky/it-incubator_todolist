import { todolistsSlice } from 'features/TodolistsList/Todolist/model/todolistsSlice'
import { tasksSlice } from 'features/TodolistsList/Todolist/Task/model/tasksSlice'
import { appSlice } from 'features/App/model/appSlice'
import { authSlice } from 'features/auth/model/authSlice'
import { configureStore } from '@reduxjs/toolkit'

export const store = configureStore({
  reducer: {
    todolists: todolistsSlice,
    tasks: tasksSlice,
    app: appSlice,
    auth: authSlice,
  },
})

//@ts-ignore
window.store = store

export type AppDispatch = typeof store.dispatch
export type AppRootState = ReturnType<typeof store.getState>
