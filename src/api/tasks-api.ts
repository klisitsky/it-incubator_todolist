import {instanse} from "./todolist-api";


export const TasksApi = {
  getTasks(todolistId: string) {
    return instanse.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
  },
  updateTask(todolistId: string, taskId: string, task: TaskModelType) {
    return instanse.put<ResponseTaskType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks/${taskId}`, task)
  },
  createTask(todolistId: string, title: string) {
    return instanse.post<ResponseTaskType<{item: TaskType}>>(`todo-lists/${todolistId}/tasks`, {title})
  },
  deleteTask(todolistId: string, taskId: string) {
    return instanse.delete<ResponseTaskType>(`todo-lists/${todolistId}/tasks/${taskId}`)
  }
}

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3
}
export enum TaskPriorities {
  Low = 0,
  Middle = 1,
  High = 2,
  Urgently = 3,
  Latest = 4
}
export type TaskType = {
  description: string
  title: string
  status: TaskStatuses
  priority: TaskPriorities
  startDate: string
  deadline: string
  id: string
  todoListId: string
  order: number
  addedDate: string
}
export type TaskModelType = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
}
export type ResponseTasksType = {
  items: TaskType[]
  totalCount: number,
  error: string
}
export type ResponseTaskType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}
