import { instanse } from 'common/api/baseApi'
import { RequestStatusType } from 'features/App/appReducer'
import { BaseResponseType } from 'common/types/appTypes'
import { TaskPriorities } from 'common/enums'

export const TasksApi = {
  getTasks(todolistId: string) {
    return instanse.get<ResponseTasksType>(`todo-lists/${todolistId}/tasks`)
  },
  updateTask(payload: updateTaskType) {
    return instanse.put<BaseResponseType<{ item: TaskType }>>(
      `todo-lists/${payload.todolistId}/tasks/${payload.taskId}`,
      payload.taskModel,
    )
  },
  createTask(todolistId: string, title: string) {
    return instanse.post<BaseResponseType<{ item: TaskType }>>(`todo-lists/${todolistId}/tasks`, { title })
  },
  deleteTask(payload: deleteTaskType) {
    return instanse.delete<BaseResponseType>(`todo-lists/${payload.todolistId}/tasks/${payload.taskId}`)
  },
}

export type updateTaskType = { todolistId: string; taskId: string; taskModel: TaskModelType }
export type deleteTaskType = { todolistId: string; taskId: string }

export enum TaskStatuses {
  New = 0,
  InProgress = 1,
  Completed = 2,
  Draft = 3,
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
  loadingStatus?: RequestStatusType
}
export type ResponseTasksType = {
  items: TaskType[]
  totalCount: number
  error: string
}
