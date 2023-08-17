import {combineReducers, legacy_createStore, compose} from 'redux'
import {todolistsReducer} from "./Reducers/todolistsReducer";
import {tasksReducer} from "./Reducers/tasksReducer";

declare global {
  interface Window {
    __REDUX_DEVTOOLS_EXTENSION_COMPOSE__?: typeof compose
  }
}


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

const composeEnhancers = window.__REDUX_DEVTOOLS_EXTENSION_COMPOSE__ || compose


export const store = legacy_createStore(rootReducer, composeEnhancers())

export type AppRootStateType = ReturnType<typeof rootReducer>

