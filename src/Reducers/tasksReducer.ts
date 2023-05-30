import {AllTasksType} from "../App";
import {v1} from "uuid";

type GlobalActionType = AddTaskActionType |
                        RemoveTaskActionType |
                        ChangeTaskStatusActionType |
                        UpdateTaskActionType

export const tasksReducer = (state: AllTasksType, action: GlobalActionType):AllTasksType => {
  switch (action.type) {
    case 'ADD-TASK':
      if (action.payLoad.taskTitle) {
        const newTask = { id: v1(), title: action.payLoad.taskTitle, isDone: false }
        return {...state, [action.payLoad.todolistId]:[newTask, ...state[action.payLoad.todolistId]]}
      } else {
        return {...state, [action.payLoad.todolistId]:[]}
      }


    case 'REMOVE-TASK':
      return {...state, [action.payLoad.todolistId]:state[action.payLoad.todolistId].filter(t => t.id !== action.payLoad.taskId)}

    case 'CHANGE-STATUS-TASK':
      return {...state, [action.payLoad.todolistId]:state[action.payLoad.todolistId].map(t => t.id === action.payLoad.taskId
            ? {...t, isDone: action.payLoad.newIsDone}
            : t
          )}

    case 'UPDATE-TASK':
      return {...state, [action.payLoad.todolistId]:state[action.payLoad.todolistId].map(t => t.id === action.payLoad.taskId
            ? {...t, title:action.payLoad.taskTitle}
            : t
          )}

    default:
      return state
  }
}



type AddTaskActionType = ReturnType<typeof addTaskAC>
export const addTaskAC = (todolistId: string, taskTitle?:string) => ({
  type: 'ADD-TASK',
  payLoad: {
    todolistId,
    taskTitle
  }
} as const)


type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export const removeTaskAC = (todolistId: string, taskId:string) => ({
  type: 'REMOVE-TASK',
  payLoad: {
    todolistId,
    taskId
  }
} as const)


type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDone:boolean) => ({
  type: 'CHANGE-STATUS-TASK',
  payLoad: {
    todolistId,
    taskId,
    newIsDone
  }
} as const)


type UpdateTaskActionType = ReturnType<typeof updateTaskAC>
export const updateTaskAC = (todolistId: string, taskId: string, taskTitle:string) => ({
  type: 'UPDATE-TASK',
  payLoad: {
    todolistId,
    taskId,
    taskTitle
  }
} as const)