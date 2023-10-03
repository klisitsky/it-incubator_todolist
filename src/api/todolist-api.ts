import axios from 'axios'


export const instanse = axios.create({
  withCredentials: true,
  baseURL: "https://social-network.samuraijs.com/api/1.1/"
})


export const TodolistApi = {

  getTodolists() {
    return instanse.get<TodolistType[]>('todo-lists')
  },

  updateTodolist(todolistId: string, title: string) {
    return instanse.put<ResponseTodolistsType<{item: TodolistType}>>(`todo-lists/${todolistId}`, {title})
  },

  setTodolist(title: string) {
    return instanse.post<ResponseTodolistsType<{item: TodolistType}>>('todo-lists', {title})
  },

  deleteTodolist(todolistId: string) {
    return instanse.delete<ResponseTodolistsType>(`todo-lists/${todolistId}`)
  }
}


export type TodolistType = {
  id: string
  title: string
  addedDate: string
  order: number
}

export type ResponseTodolistsType<D = {}> = {
  resultCode: number
  messages: string[],
  data: D
}


