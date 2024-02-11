import { AxiosResponse } from 'axios'
import { instanse } from 'common/api/baseApi'
import { BaseResponse } from 'common/types/appTypes'

export const TodolistApi = {
  getTodolists() {
    return instanse.get<TodolistType[], AxiosResponse<TodolistType[]>>('todo-lists')
  },
  updateTodolist(payload: updateTaskPayload) {
    return instanse.put<
      BaseResponse<{ item: TodolistType }>,
      AxiosResponse<BaseResponse<{ item: TodolistType }>>,
      { title: string }
    >(`todo-lists/${payload.todolistId}`, { title: payload.title })
  },
  createTodolist(title: string) {
    return instanse.post<
      BaseResponse<{ item: TodolistType }>,
      AxiosResponse<BaseResponse<{ item: TodolistType }>>,
      { title: string }
    >('todo-lists', { title })
  },
  deleteTodolist(todolistId: string) {
    return instanse.delete<BaseResponse, AxiosResponse<BaseResponse>>(`todo-lists/${todolistId}`)
  },
}

// types
export type UserType = {
  id: number
  email: string
  login: string
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type updateTaskPayload = { todolistId: string; title: string }
