import {combineReducers, legacy_createStore, compose, applyMiddleware} from 'redux'
import {TodolistActionsType, todolistsReducer} from "./Reducers/todolistsReducer";
import {TaskActionsType, tasksReducer} from "./Reducers/tasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {useDispatch} from "react-redux";

export type AppActionsType =
  | TodolistActionsType
  | TaskActionsType
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AppActionsType>
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, AppActionsType>


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
export const useAppDispatch = () =>  useDispatch<AppDispatchType>()

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))



