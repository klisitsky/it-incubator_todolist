import { TodolistDomainType } from 'features/TodolistsList/Todolist/todolistsReducer'
import { TaskDomainType } from 'features/TodolistsList/Todolist/Task/tasksReducer'
import { AppRootStateType } from 'features/App/store'

export const todolistsSelector = (state: AppRootStateType): Array<TodolistDomainType> => {
  return state.todolists.todolists
}

type tasksSelectorType = (state: AppRootStateType) => Array<TaskDomainType>

export const tasksSelector = (todolistId: string): tasksSelectorType => {
  return (state: AppRootStateType) => state.tasks[todolistId]
}
