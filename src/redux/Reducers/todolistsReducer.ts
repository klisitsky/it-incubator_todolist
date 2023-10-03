import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC, setTodolists
} from "../actions/todolistsActions";
import {TodolistType} from "../../api/todolist-api";

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>
export type SetTodolistsActionType = ReturnType<typeof setTodolists>

type ActionsType = ChangeTodolistFilterActionType
  | ChangeTodolistTitleActionType
  | DeleteTodolistActionType
  | AddTodolistActionType
  | SetTodolistsActionType


export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterType
}


const initialState: Array<TodolistDomainType> = []

export const todolistsReducer = (state = initialState, action: ActionsType):Array<TodolistDomainType> => {
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
      const newTodolist: TodolistDomainType = {
        id: action.payLoad.todolistId,
        title: action.payLoad.newTitle,
        filter: 'all',
        addedDate: '',
        order: 1
      }
      return [...state, newTodolist]

    case "SET-TODOLISTS":
      return action.todolists.map(el => ({...el, filter: 'all'}))

    default:
      return state
  }
}


