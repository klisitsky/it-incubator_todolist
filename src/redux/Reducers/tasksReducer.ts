import {
  AddTodolistActionType,
  DeleteTodolistActionType,
  SetTodolistsActionType
} from "./todolistsReducer";
import {createTaskAC, deleteTaskAC, setTasksAC, updateTaskAC} from "../actions/tasksActions";
import {TaskType} from "../../api/tasks-api";
import {RequestStatusType} from "./appReducer";


export type TaskActionsType =
  | ReturnType<typeof createTaskAC>
  | ReturnType<typeof deleteTaskAC>
  | ReturnType<typeof updateTaskAC>
  | ReturnType<typeof setTasksAC>
  | AddTodolistActionType
  | DeleteTodolistActionType
  | SetTodolistsActionType

export type TaskDomainType = TaskType & {
  loadingStatus: RequestStatusType
}
export type AllTasksType = {
  [todolistId: string]: Array<TaskDomainType>
}

const initialState: AllTasksType = {}

export const tasksReducer = (state: AllTasksType = initialState, action: TaskActionsType): AllTasksType => {
  switch (action.type) {
    case "SET-TASKS":
      return {
        ...state,
        [action.todolistId]: action.tasks.map(t => ({...t, loadingStatus: 'idle'}))
      }
    case 'CREATE-TASK':
      return {
        ...state,
        [action.todolistId]: [{...action.task, loadingStatus: 'idle'}, ...state[action.todolistId]]
      }
    case 'REMOVE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId].filter(t => t.id !== action.taskId)
      }
    case 'UPDATE-TASK':
      return {
        ...state,
        [action.todolistId]: state[action.todolistId]
          .map(t => t.id === action.taskId ? {...t, ...action.task} : t)
      }
    case 'ADD-TODOLIST':
      return {...state, [action.todolist.id]: []}
    case "DELETE-TODOLIST": {
      const stateCopy = {...state}
      delete stateCopy[action.todolistId]
      return stateCopy
    }
    case "SET-TODOLISTS": {
      const stateCopy = {...state}
      action.todolists.forEach(el => stateCopy[el.id] = [])
      return stateCopy
    }
    default:
      return state
  }
}







