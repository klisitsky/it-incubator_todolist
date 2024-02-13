import { TodolistDomain } from 'features/TodolistsList/Todolist/model/todolistsSlice'
import { TaskDomain } from 'features/TodolistsList/Todolist/Task/model/tasksSlice'
import { AppRootState } from 'features/App/store'

export const todolistsSelector = (state: AppRootState): Array<TodolistDomain> => {
  return state.todolists.todolists
}

type tasksSelector = (state: AppRootState) => Array<TaskDomain>

export const tasksSelector = (todolistId: string): tasksSelector => {
  return (state: AppRootState) => state.tasks[todolistId]
}
