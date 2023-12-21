import { AxiosResponse } from 'axios'
import { instanse } from 'common/api/baseApi'
import { ResponseType } from 'common/types/appTypes'

export const TodolistApi = {
  getTodolists() {
    return instanse.get<TodolistType[], AxiosResponse<TodolistType[]>>('todo-lists')
  },
  updateTodolist(todolistId: string, title: string) {
    return instanse.put<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      { title: string }
    >(`todo-lists/${todolistId}`, { title })
  },
  createTodolist(title: string) {
    return instanse.post<
      ResponseType<{ item: TodolistType }>,
      AxiosResponse<ResponseType<{ item: TodolistType }>>,
      { title: string }
    >('todo-lists', { title })
  },
  deleteTodolist(todolistId: string) {
    return instanse.delete<ResponseType, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`)
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
