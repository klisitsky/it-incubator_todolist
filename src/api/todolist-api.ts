import axios, {AxiosResponse} from 'axios'
import {LoginParamsType} from "../components/Login/Login";


export const instanse = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1/",
  "API-KEY": "a68c16fd-b564-46c3-b168-8a8bf32018cc"
} as any)

export const authAPI = {
  me() {
    return instanse.get<ResponseType<UserType>, AxiosResponse<ResponseType<UserType>>>('auth/me')
  },
  login(payLoad: LoginParamsType) {
    return instanse.post<ResponseType<{userId: number}>, AxiosResponse<ResponseType<{userId: number}>>, LoginParamsType>('auth/login', payLoad)
  },
  logOut() {
    return instanse.delete<ResponseType>('auth/login')
  },
}

export const TodolistApi = {
  getTodolists() {
    return instanse.get<TodolistType[], AxiosResponse<TodolistType[]>>('todo-lists')
  },
  updateTodolist(todolistId: string, title: string) {
    return instanse.put<ResponseType<{item: TodolistType}>, AxiosResponse<ResponseType<{item: TodolistType}>>, {title: string}>(`todo-lists/${todolistId}`, {title})
  },
  createTodolist(title: string) {
    return instanse.post<ResponseType<{item: TodolistType}>, AxiosResponse<ResponseType<{item: TodolistType}>>, {title: string}>('todo-lists', {title})
  },
  deleteTodolist(todolistId: string) {
    return instanse.delete<ResponseType, AxiosResponse<ResponseType>>(`todo-lists/${todolistId}`)
  }
}

export enum RequestResultsType {
  OK = 0,
  ERROR = 1,
  CAPTCHA = 2
}

export type UserType = {
  id: number,
  email: string,
  login: string
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
  message: string
  error: string
}


