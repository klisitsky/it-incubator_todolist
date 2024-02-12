import { TodolistDomainType } from 'features/TodolistsList/Todolist/model/todolistsSlice'
import { TaskDomain } from 'features/TodolistsList/Todolist/Task/model/tasksSlice'
import { AppRootStateType } from 'features/App/store'

export const todolistsSelector = (state: AppRootStateType): Array<TodolistDomainType> => {
  return state.todolists.todolists
}

type tasksSelectorType = (state: AppRootStateType) => Array<TaskDomain>

export const tasksSelector = (todolistId: string): tasksSelectorType => {
  return (state: AppRootStateType) => state.tasks[todolistId]
}
