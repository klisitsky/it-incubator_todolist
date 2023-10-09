import {TaskModelType, TaskType} from "../../api/tasks-api";

export const createTaskAC = (todolistId: string, task: TaskType) =>
  ({type: 'CREATE-TASK', todolistId, task} as const)

export const deleteTaskAC = (todolistId: string, taskId: string) =>
  ({type: 'REMOVE-TASK', todolistId, taskId} as const)

export const updateTaskAC = (todolistId: string, taskId: string, task: TaskModelType) =>
  ({type: 'UPDATE-TASK', todolistId, taskId, task} as const)

export const setTasksAC = (todolistId: string, tasks: TaskType[]) =>
  ({type: 'SET-TASKS', todolistId, tasks} as const)

