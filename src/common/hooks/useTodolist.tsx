import { useSelector } from 'react-redux'
import { tasksSelector } from 'common/selectors/selectors'
import { useCallback } from 'react'
import {
  deleteTodolistTC,
  FilterType,
  todolistsActions,
  updateTodolistTC,
} from 'features/TodolistsList/Todolist/todolistsReducer'
import { TaskStatuses } from 'features/TodolistsList/Todolist/Task/tasksApi'
import { TaskDomainType, tasksThunks } from 'features/TodolistsList/Todolist/Task/tasksReducer'
import { AppRootStateType } from 'features/App/store'
import { useAppDispatch } from 'common/hooks'

export const useTodolist = (todolistId: string, todolistFilter: FilterType) => {
  const dispatch = useAppDispatch()

  const selectedTasksByTodolistId = tasksSelector(todolistId)
  const tasks = useSelector<AppRootStateType, Array<TaskDomainType>>(selectedTasksByTodolistId)
  let filteredTasks = tasks

  switch (todolistFilter) {
    case 'active':
      filteredTasks = tasks.filter((task) => task.status === TaskStatuses.New)
      break
    case 'completed':
      filteredTasks = tasks.filter((task) => task.status === TaskStatuses.Completed)
      break
  }

  const changeTodolistTitle = useCallback(
    (changedTodolistTitle: string) => {
      dispatch(updateTodolistTC(todolistId, changedTodolistTitle))
    },
    [todolistId],
  )

  const onDeleteTodolistClickHandler = useCallback(() => {
    dispatch(deleteTodolistTC(todolistId))
  }, [todolistId])

  const changeTodolistFilter = useCallback(
    (filter: FilterType) => {
      dispatch(todolistsActions.changeTodolistFilter({ todolistId, filter }))
    },
    [todolistId],
  )

  const addTask = useCallback(
    (title: string) => {
      dispatch(tasksThunks.createTask({ todolistId, title }))
    },
    [todolistId],
  )

  return {
    filteredTasks,
    changeTodolistTitle,
    onDeleteTodolistClickHandler,
    addTask,
    changeTodolistFilter,
  }
}
