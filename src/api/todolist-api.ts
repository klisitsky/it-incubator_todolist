


export const TodolistApi = {
  getTodolists() {},
  updateTodolist() {},
  setTodolist() {},
  deleteTodolist() {}
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


