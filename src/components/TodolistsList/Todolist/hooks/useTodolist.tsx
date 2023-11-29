import { useSelector } from 'react-redux'
import { tasksSelector } from 'redux/selectors/selectors'
import { useCallback } from 'react'
import { deleteTodolistTC, FilterType, todolistsActions, updateTodolistTC } from 'redux/Reducers/todolistsReducer'
import { TaskStatuses } from 'api/tasks-api'
import { createTaskTC, TaskDomainType } from 'redux/Reducers/tasksReducer'
import { AppRootStateType, useAppDispatch } from 'components/App/redux-store'

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
      dispatch(createTaskTC(todolistId, title))
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
