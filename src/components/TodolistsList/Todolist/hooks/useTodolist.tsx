import {useSelector} from "react-redux";
import {tasksSelector} from "../../../../redux/selectors/selectors";
import {AppRootStateType, useAppDispatch} from "../../../App/redux-store";
import React, {useCallback} from "react";
import {changeTodolistFilterAC} from "../../../../redux/actions/todolistsActions";
import {FilterType} from "../../../../redux/Reducers/todolistsReducer";
import {TaskStatuses} from "../../../../api/tasks-api";
import {createTaskTC} from "../../../../redux/thunks/thunksTasks";
import {deleteTodolistTC, updateTodolistTC} from "../../../../redux/thunks/thunksTodolists";
import {TaskDomainType} from "../../../../redux/Reducers/tasksReducer";


export const useTodolist = (todolistId: string,
                            todolistFilter: FilterType) => {

  const dispatch = useAppDispatch()

  // useEffect(() => {
  //   console.log('3')
  //   dispatch(getTasksTC(todolistId))
  // },[dispatch])


  const selectedTasksByTodolistId = tasksSelector(todolistId)
  const tasks = useSelector<AppRootStateType, Array<TaskDomainType>>(selectedTasksByTodolistId)
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