import {
  AddTodolistActionType,
  DeleteTodolistActionType,
  SetTodolistsActionType
} from "./todolistsReducer";
import {createTaskAC, changeTaskStatusAC, deleteTaskAC, setTasksAC, updateTaskAC} from "../actions/tasksActions";
import {TaskType} from "../../api/tasks-api";

export type AddTaskActionType = ReturnType<typeof createTaskAC>
export type RemoveTaskActionType = ReturnType<typeof deleteTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export type SetTasksActionType = ReturnType<typeof setTasksAC>

type ActionsType = AddTaskActionType
  | RemoveTaskActionType
  | ChangeTaskStatusActionType
  | UpdateTaskActionType
  | AddTodolistActionType
  | DeleteTodolistActionType
  | SetTodolistsActionType
  | SetTasksActionType


export type AllTasksType = {
  [todolistId: string]: Array<TaskType>
}

const initialState: AllTasksType = {}


export const tasksReducer = (state: AllTasksType = initialState, action: ActionsType): AllTasksType => {
  switch (action.type) {

    case "SET-TASKS":
      return {
        ...state,
        [action.todolistId]: action.tasks
      }

    case 'CREATE-TASK':
      return {
        ...state,
        [action.todolistId]: [action.task, ...state[action.todolistId]]
      }

    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payLoad.todolistId]: state[action.payLoad.todolistId].filter(t => t.id !== action.payLoad.taskId)
      }

    case 'CHANGE-STATUS-TASK':
      return {
        ...state, [action.payLoad.todolistId]: state[action.payLoad.todolistId].map(t => t.id === action.payLoad.taskId
          ? {...t, status: action.payLoad.newStatus}
          : t
        )
      }

    case 'CHANGE-TITLE-TASK':
      return {
        ...state, [action.payLoad.todolistId]: state[action.payLoad.todolistId].map(t => t.id === action.payLoad.taskId
          ? {...t, title: action.payLoad.taskTitle}
          : t
        )
      }

    case 'ADD-TODOLIST':
      return {...state, [action.payLoad.todolistId]: []}

    case "DELETE-TODOLIST": {
      const stateCopy = {...state}
      delete stateCopy[action.payLoad.todolistId]
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







