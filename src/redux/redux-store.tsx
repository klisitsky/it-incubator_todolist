import {combineReducers, createStore } from 'redux'
import {todolistsReducer} from "../Reducers/todolistsReducer";
import {tasksReducer} from "../Reducers/tasksReducer";


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer
})

export type AppRootStateType = ReturnType<typeof rootReducer>

export const store = createStore(rootReducer)

