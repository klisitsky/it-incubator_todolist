import {FilterType} from "../Reducers/todolistsReducer";
import {TodolistType} from "../../api/todolist-api";
import {RequestStatusType} from "../Reducers/appReducer";

export const changeTodolistFilterAC = (todolistId: string, newFilter:FilterType) =>
  ({type: 'CHANGE-TODOLIST-FILTER', todolistId, newFilter} as const)

export const changeTodolistLoadingStatusAC = (todolistId: string, newLoadingStatus:RequestStatusType) =>
  ({type: 'CHANGE-TODOLIST-LOADING-STATUS', todolistId, newLoadingStatus} as const)

export const changeTodolistTitleAC = (todolistId:string, newTitle: string) =>
  ({type: 'CHANGE-TODOLIST-TITLE', todolistId, newTitle} as const)

export const deleteTodolistAC = (todolistId:string) =>
  ({type: 'DELETE-TODOLIST', todolistId,} as const)

export const createTodolistAC = (todolist: TodolistType) =>
  ({type: 'ADD-TODOLIST', todolist} as const)

export const setTodolists = (todolists: TodolistType[]) =>
  ({type: 'SET-TODOLISTS', todolists} as const)