
export const addTaskAC = (todolistId: string, taskTitle:string) => ({
  type: 'ADD-TASK',
  payLoad: {
    todolistId,
    taskTitle
  }
} as const)

export const removeTaskAC = (todolistId: string, taskId:string) => ({
  type: 'REMOVE-TASK',
  payLoad: {
    todolistId,
    taskId
  }
} as const)

export const changeTaskStatusAC = (todolistId: string, taskId: string, newIsDone:boolean) => ({
  type: 'CHANGE-STATUS-TASK',
  payLoad: {
    todolistId,
    taskId,
    newIsDone
  }
} as const)

export const updateTaskAC = (todolistId: string, taskId: string, taskTitle:string) => ({
  type: 'UPDATE-TASK',
  payLoad: {
    todolistId,
    taskId,
    taskTitle
  }
} as const)