import {AppRootStateType} from "../redux-store";
import {TodolistType} from "../Reducers/todolistsReducer";
import {TaskType} from "../Reducers/tasksReducer";

export const todolistsSelector = (state:AppRootStateType):Array<TodolistType> => {
  return state.todolists
}

type tasksSelectorType = (state:AppRootStateType) => Array<TaskType>

export const tasksSelector = (todolistId: string): tasksSelectorType  => {
  return (state:AppRootStateType) => state.tasks[todolistId]
}
