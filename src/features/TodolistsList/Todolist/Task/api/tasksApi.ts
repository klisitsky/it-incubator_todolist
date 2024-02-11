import { instanse } from 'common/api/baseApi'
import { RequestStatus } from 'features/App/model/appReducer'
import { BaseResponse } from 'common/types/appTypes'
import { TaskPriorities } from 'common/enums'

export const TasksApi = {
  getTasks(todolistId: string) {
    return instanse.get<ResponseTasks>(`todo-lists/${todolistId}/tasks`)
  },
  updateTask(payload: updateTaskPayload) {
    return instanse.put<BaseResponse<{ item: Task }>>(
      `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
      payload.taskModel,
    )
  },
  createTask(todolistId: string, title: string) {
    return instanse.post<BaseResponse<{ item: Task }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload: deleteTaskPayload) {
    return instanse.delete<BaseResponse>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },
}

export type updateTaskPayload = { todolistId: string; taskId: string; taskModel: TaskModel }
export type deleteTaskPayload = { todolistId: string; taskId: string }

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
}

export type Task = {
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
export type TaskModel = {
  title?: string
  description?: string
  status?: TaskStatuses
  priority?: TaskPriorities
  startDate?: string
  deadline?: string
  loadingStatus?: RequestStatus
}
export type ResponseTasks = {
  items: Task[]
  totalCount: number
  error: string
}
