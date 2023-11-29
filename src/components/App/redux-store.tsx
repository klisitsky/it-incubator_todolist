import { AnyAction, combineReducers } from 'redux'
import { todolistsReducer } from 'redux/Reducers/todolistsReducer'
import { tasksReducer } from 'redux/Reducers/tasksReducer'
import { ThunkAction, ThunkDispatch } from 'redux-thunk'
import { TypedUseSelectorHook, useDispatch, useSelector } from 'react-redux'
import { appReducer } from 'redux/Reducers/appReducer'
import { authReducer } from 'redux/Reducers/authReducer'
import { configureStore } from '@reduxjs/toolkit'

export const useAppDispatch = () => useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

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

export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AnyAction>
