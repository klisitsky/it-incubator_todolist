import { AppRootStateType } from 'components/App/redux-store'
import { TodolistDomainType } from '../Reducers/todolistsReducer'
import { TaskDomainType } from '../Reducers/tasksReducer'

export const todolistsSelector = (state: AppRootStateType): Array<TodolistDomainType> => {
  return state.todolists.todolists
}

type tasksSelectorType = (state: AppRootStateType) => Array<TaskDomainType>

export const tasksSelector = (todolistId: string): tasksSelectorType => {
  return (state: AppRootStateType) => state.tasks[todolistId]
}
