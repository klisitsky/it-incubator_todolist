import {useSelector} from "react-redux";
import {tasksSelector} from "../../../../redux/selectors/selectors";
import {AppRootStateType, useAppDispatch} from "../../../../redux/redux-store";
import React, {useCallback, useEffect} from "react";
import {changeTodolistFilterAC} from "../../../../redux/actions/todolistsActions";
import {FilterType} from "../../../../redux/Reducers/todolistsReducer";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";
import {createTaskTC, getTasksTC} from "../../../../redux/thunks/thunksTasks";
import {deleteTodolistTC, updateTodolistTC} from "../../../../redux/thunks/thunksTodolists";


export const useTodolist = (todolistId: string,
                            todolistFilter: FilterType) => {

  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(getTasksTC(todolistId))
  },[dispatch])


  const selectedTasksByTodolistId = tasksSelector(todolistId)
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(selectedTasksByTodolistId)
  let filteredTasks = tasks

  switch (todolistFilter) {
    case 'active':
      filteredTasks = tasks.filter(task => task.status === TaskStatuses.New)
      break;
    case 'completed':
      filteredTasks = tasks.filter(task => task.status === TaskStatuses.Completed)
      break;
  }

  const changeTodolistTitle = useCallback((changedTodolistTitle: string) => {
    dispatch(updateTodolistTC(todolistId, changedTodolistTitle))
  }, [todolistId])

  const onDeleteTodolistClickHandler = useCallback(() => {
    dispatch(deleteTodolistTC(todolistId))
  }, [todolistId])


  const changeTodolistFilter = useCallback((newFilter: FilterType) => {
    dispatch(changeTodolistFilterAC(todolistId, newFilter))
  }, [todolistId])


  const addTask = useCallback((title: string) => {
    dispatch(createTaskTC(todolistId, title))
  }, [todolistId])


  return {
    filteredTasks,
    changeTodolistTitle,
    onDeleteTodolistClickHandler,
    addTask,
    changeTodolistFilter
  }
}