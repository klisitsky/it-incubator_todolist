import {
  createTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC, setTodolists
} from "../actions/todolistsActions";
import {TodolistType} from "../../api/todolist-api";


export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof createTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolists>

export type TodolistActionsType =
  | ReturnType<typeof changeTodolistFilterAC>
  | ReturnType<typeof changeTodolistTitleAC>
  | DeleteTodolistActionType
  | AddTodolistActionType
  | SetTodolistsActionType

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: TodolistActionsType):Array<TodolistDomainType> => {
  switch (action.type) {
    case 'CHANGE-TODOLIST-FILTER':
      return state
        .map(tl => tl.id === action.todolistId ? {...tl, filter:action.newFilter} : tl)
    case 'CHANGE-TODOLIST-TITLE':
      return state
        .map(tl => tl.id === action.todolistId ? {...tl, title: action.newTitle} : tl)
    case 'DELETE-TODOLIST':
      return state.filter(tl => tl.id !== action.todolistId)
    case "ADD-TODOLIST":
      return [{...action.todolist, filter: 'all'}, ...state]
    case "SET-TODOLISTS":
      return action.todolists.map(el => ({...el, filter: 'all'}))
    default:
      return state
  }
}


