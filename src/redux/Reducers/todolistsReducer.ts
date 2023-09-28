import {v1} from "uuid";
import {
  addTodolistAC,
  changeTodolistFilterAC,
  changeTodolistTitleAC,
  deleteTodolistAC
} from "../actions/todolistsActions";
import {TodolistType} from "../../api/todolist-api";

export type ChangeTodolistFilterActionType = ReturnType<typeof changeTodolistFilterAC>
export type ChangeTodolistTitleActionType = ReturnType<typeof changeTodolistTitleAC>
export type DeleteTodolistActionType = ReturnType<typeof deleteTodolistAC>
export type AddTodolistActionType = ReturnType<typeof addTodolistAC>

type ActionsType = ChangeTodolistFilterActionType |
                        ChangeTodolistTitleActionType |
                        DeleteTodolistActionType |
                        AddTodolistActionType


export type FilterType = 'all' | 'active' | 'completed'

export type TodolistDomainType = TodolistType & {
  filter: FilterType
}

export const todolistId1 = v1();
export const todolistId2 = v1();

const initialState: Array<TodolistDomainType> = [
  {id:todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
  {id:todolistId2, title: 'What to buy', filter: 'active', addedDate: '', order: 1}
]

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

    default:
      return state
  }
}


