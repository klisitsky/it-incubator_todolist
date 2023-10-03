import {v1} from "uuid";
import {FilterType} from "../Reducers/todolistsReducer";
import {TodolistType} from "../../api/todolist-api";

export const changeTodolistFilterAC = (todolistId: string, newFilter:FilterType) => ({
  type: 'CHANGE-TODOLIST-FILTER',
  payLoad: {
    todolistId,
    newFilter
  }
} as const)

export const changeTodolistTitleAC = (todolistId:string, changedTodolistTitle: string) => ({
  type: 'CHANGE-TODOLIST-TITLE',
  payLoad: {
    todolistId,
    changedTodolistTitle
  }
} as const)

export const deleteTodolistAC = (todolistId:string) => ({
  type: 'DELETE-TODOLIST',
  payLoad: {
    todolistId,
  }
} as const)

export const addTodolistAC = (newTitle: string) => ({
  type: 'ADD-TODOLIST',
  payLoad: {
    newTitle,
    todolistId: v1()
  }
} as const)

export const setTodolists = (todolists: TodolistType[]) => ({
  type: 'SET-TODOLISTS',
  todolists
} as const)