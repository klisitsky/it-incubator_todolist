import {AppRootStateType} from "../redux-store";
import {TaskType} from "../../api/tasks-api";
import {TodolistDomainType} from "../Reducers/todolistsReducer";


export const todolistsSelector = (state:AppRootStateType):Array<TodolistDomainType> => {
  return state.todolists
}

type tasksSelectorType = (state:AppRootStateType) => Array<TaskType>

export const tasksSelector = (todolistId: string): tasksSelectorType  => {
  return (state:AppRootStateType) => state.tasks[todolistId]
}
