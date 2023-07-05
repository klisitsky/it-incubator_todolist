import {FilterType, TodolistType} from "../App";
import {v1} from "uuid";


type GlobalActionType = ChangeTodolistFilterActionType |
                        ChangeTodolistTitleActionType |
                        DeleteTodolistActionType |
                        AddTodolistActionType

export const todolistsReducer = (state: Array<TodolistType>, action: GlobalActionType):Array<TodolistType> => {
  switch (action.type) {
    case 'CHANGE-TODOLIST-FILTER':
      return state.map(tl => tl.id === action.payLoad.todolistId
        ? {...tl, filter:action.payLoad.newFilter}
        : tl
      )

    case 'CHANGE-TODOLIST-TITLE':
      return state.map(tl => tl.id === action.payLoad.todolistId
        ? {...tl, title: action.payLoad.changedTodolistTitle}
        : tl
      )

    case 'DELETE-TODOLIST':
      return state.filter(tl => tl.id !== action.payLoad.todolistId)

    case "ADD-TODOLIST":
      const newTodolist: TodolistType = {
        id: action.payLoad.todolistId,
        title: action.payLoad.newTitle,
        filter: 'all'
      }
      return [...state, newTodolist]

    default:
      return state
  }
}

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export const changeTodolistFilterAC = (todolistId: string, newFilter:FilterType) => ({
  type: 'CHANGE-TODOLIST-FILTER',
  payLoad: {
    todolistId,
    newFilter
  }
} as const)

export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export const changeTodolistTitleAC = (todolistId:string, changedTodolistTitle: string) => ({
  type: 'CHANGE-TODOLIST-TITLE',
  payLoad: {
    todolistId,
    changedTodolistTitle
  }
} as const)

export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export const deleteTodolistAC = (todolistId:string) => ({
  type: 'DELETE-TODOLIST',
  payLoad: {
    todolistId,
  }
} as const)

export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export const addTodolistAC = (newTitle: string) => ({
  type: 'ADD-TODOLIST',
  payLoad: {
    newTitle,
    todolistId: v1()
  }
} as const)