import {TaskStatuses} from "../../api/tasks-api";

export const addTaskAC = (todolistId: string, taskTitle:string) => ({
  type: 'ADD-TASK',
  payLoad: {
    todolistId,
    taskTitle
  }
} as const)

export const removeTaskAC = (todolistId: string, taskId:string) => ({
  type: 'REMOVE-TASK',
  payLoad: {
    todolistId,
    taskId
  }
} as const)

export const changeTaskStatusAC = (todolistId: string, taskId: string, newStatus:TaskStatuses) => ({
  type: 'CHANGE-STATUS-TASK',
  payLoad: {
    todolistId,
    taskId,
    newStatus
  }
} as const)

export const updateTaskAC = (todolistId: string, taskId: string, taskTitle:string) => ({
  type: 'CHANGE-TITLE-TASK',
  payLoad: {
    todolistId,
    taskId,
    taskTitle
  }
} as const)