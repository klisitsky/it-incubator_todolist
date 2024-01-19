import { AxiosResponse } from 'axios'
import { instanse } from 'common/api/baseApi'
import { BaseResponseType } from 'common/types/appTypes'

export const TodolistApi = {
  getTodolists() {
    return instanse.get<TodolistType[], AxiosResponse<TodolistType[]>>('todo-lists')
  },
  updateTodolist(todolistId: string, title: string) {
    return instanse.put<
      BaseResponseType<{ item: TodolistType }>,
      AxiosResponse<BaseResponseType<{ item: TodolistType }>>,
      { title: string }
    >(`todo-lists/${todolistId}`, { title })
  },
  createTodolist(title: string) {
    return instanse.post<
      BaseResponseType<{ item: TodolistType }>,
      AxiosResponse<BaseResponseType<{ item: TodolistType }>>,
      { title: string }
    >('todo-lists', { title })
  },
  deleteTodolist(todolistId: string) {
    return instanse.delete<BaseResponseType, AxiosResponse<BaseResponseType>>(`todo-lists/${todolistId}`)
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
