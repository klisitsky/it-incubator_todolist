import {combineReducers, legacy_createStore, compose, AnyAction, applyMiddleware} from 'redux'
import {todolistsReducer} from "./Reducers/todolistsReducer";
import {tasksReducer} from "./Reducers/tasksReducer";
import thunk, {ThunkDispatch} from "redux-thunk"
import {useDispatch} from "react-redux";


declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}
export type AppDispatchType = ThunkDispatch<AppRootStateType, any, AnyAction>

export const useAppDispatch = () =>  useDispatch<AppDispatchType>()

const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})



const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = legacy_createStore(rootReducer, composeEnhancers(applyMiddleware(thunk)))

export type AppRootStateType = ReturnType<typeof rootReducer>

