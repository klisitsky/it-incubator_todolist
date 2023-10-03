import {TaskStatuses, TaskType} from "../../api/tasks-api";

export const createTaskAC = (todolistId: string, task:TaskType) => ({
  type: 'CREATE-TASK',
  todolistId,
  task
} as const)

export const deleteTaskAC = (todolistId: string, taskId:string) => ({
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

export const setTasksAC = (todolistId: string, tasks: TaskType[]) => ({
  type: 'SET-TASKS',
  todolistId,
  tasks
} as const)
