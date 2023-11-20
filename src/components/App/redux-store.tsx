import {combineReducers, legacy_createStore, compose, applyMiddleware} from 'redux'
import {TodolistActionsType, todolistsReducer} from "../../redux/Reducers/todolistsReducer";
import {TaskActionsType, tasksReducer} from "../../redux/Reducers/tasksReducer";
import thunk, {ThunkAction, ThunkDispatch} from "redux-thunk"
import {TypedUseSelectorHook, useDispatch, useSelector} from "react-redux";
import {AppActionsType, appReducer} from "../../redux/Reducers/appReducer";
import {authReducer} from "../../redux/Reducers/authReducer";

export type GlobalActionsType =
  | TodolistActionsType
  | TaskActionsType
  | AppActionsType
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, GlobalActionsType>
export type AppRootStateType = ReturnType<typeof rootReducer>
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, AppRootStateType, unknown, GlobalActionsType>


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
export const useAppDispatch = () =>  useDispatch<AppDispatchType>()
export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer,
  auth: authReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose

export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

//@ts-ignore
window.store = store


