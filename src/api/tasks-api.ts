


export const TasksApi = {
  getTasks() {},
  updateTask() {},
  setTask() {},
  deleteTask() {}
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



export type ResponseTasksType<D = {}> = {
  "items": TaskType[]
  "totalCount": number,
  "error": string
}

