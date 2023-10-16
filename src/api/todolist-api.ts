import axios from 'axios'


export const instanse = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  "API-KEY": "a68c16fd-b564-46c3-b168-8a8bf32018cc"
} as any)

export const TodolistApi = {
  getTodolists() {
    return instanse.get<TodolistType[]>('todo-lists')
  },
  updateTodolist(todolistId: string, title: string) {
    return instanse.put<ResponseType<{item: TodolistType}>>(`todo-lists/${todolistId}`, {title})
  },
  createTodolist(title: string) {
    return instanse.post<ResponseType<{item: TodolistType}>>('todo-lists', {title})
  },
  deleteTodolist(todolistId: string) {
    return instanse.delete<ResponseType>(`todo-lists/${todolistId}`)
  }
}

export enum RequestResultsType {
  OK = 0,
  ERROR = 1,
  CAPTCHA = 2
}

export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}
export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}

export type ErrorType = {
  statusCode: number
  message: [
    {
      message: string
      field: string
    }
  ]
  error: string
}


