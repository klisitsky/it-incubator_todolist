import { TaskModelType, TasksApi, TaskType } from 'api/tasks-api'
import { appActions, RequestStatusType } from './appReducer'
import { AppDispatchType, AppRootStateType, AppThunk } from 'components/App/redux-store'
import axios from 'axios'
import { ErrorType, RequestResultsType } from 'api/todolist-api'
import { handleServerError, handleServerNetworkError } from 'utils/utils'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { todolistsActions } from 'redux/Reducers/todolistsReducer'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as AllTasksType,
  reducers: {
    createTask: (state, action: PayloadAction<{ todolistId: string; task: TaskType }>) => {
      const newTask: TaskDomainType = { ...action.payload.task, loadingStatus: 'idle' }
      state[action.payload.todolistId].unshift(newTask)
    },
    deleteTask: (state, action: PayloadAction<{ todolistId: string; taskId: string }>) => {
      const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        state[action.payload.todolistId].splice(index, 1)
      }
    },
    updateTask: (state, action: PayloadAction<{ todolistId: string; taskId: string; taskModel: TaskModelType }>) => {
      const TasksList = state[action.payload.todolistId]
      const index = TasksList.findIndex((task) => task.id === action.payload.taskId)
      if (index !== -1) {
        TasksList[index] = {
          ...TasksList[index],
          ...action.payload.taskModel,
        }
      }
    },
    setTasks: (state, action: PayloadAction<{ todolistId: string; tasks: TaskType[] }>) => {
      state[action.payload.todolistId] = action.payload.tasks.map((task) => ({ ...task, loadingStatus: 'idle' }))
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(todolistsActions.createTodolist, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsActions.deleteTodolist, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsActions.setTodolists, (state, action) => {
        action.payload.todolists.map((todo) => {
          state[todo.id] = []
        })
      })
      .addCase(todolistsActions.clearData, (state, action) => {
        return {}
      })
  },
})

export const getTasksTC =
  (todolistId: string): AppThunk =>
  async (dispatch: AppDispatchType) => {
    dispatch(appActions.setAppLoadingStatus({ status: 'loading' }))
    try {
      const res = await TasksApi.getTasks(todolistId)
      dispatch(tasksActions.setTasks({ todolistId, tasks: res.data.items }))
      dispatch(appActions.setAppLoadingStatus({ status: 'succeeded' }))
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        const errorMessage = e.response ? e.response.data.message : e.message
        handleServerNetworkError(dispatch, errorMessage)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }

export const deleteTaskTC =
  (todolistId: string, taskId: string): AppThunk =>
  async (dispatch: AppDispatchType) => {
    dispatch(appActions.setAppLoadingStatus({ status: 'loading' }))
    dispatch(tasksActions.updateTask({ todolistId, taskId, taskModel: { loadingStatus: 'loading' } }))
    try {
      const res = await TasksApi.deleteTask(todolistId, taskId)
      if (res.data.resultCode === RequestResultsType.OK) {
        dispatch(tasksActions.deleteTask({ todolistId, taskId }))
        dispatch(appActions.setAppLoadingStatus({ status: 'succeeded' }))
      } else {
        handleServerError(dispatch, res.data)
        dispatch(tasksActions.updateTask({ todolistId, taskId, taskModel: { loadingStatus: 'failed' } }))
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        const errorMessage = e.response ? e.response.data.message : e.message
        handleServerNetworkError(dispatch, errorMessage)
        dispatch(tasksActions.updateTask({ todolistId, taskId, taskModel: { loadingStatus: 'failed' } }))
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
        dispatch(tasksActions.updateTask({ todolistId, taskId, taskModel: { loadingStatus: 'failed' } }))
      }
    }
  }
export const createTaskTC =
  (todolistId: string, title: string): AppThunk =>
  async (dispatch: AppDispatchType) => {
    dispatch(appActions.setAppLoadingStatus({ status: 'loading' }))
    try {
      const res = await TasksApi.createTask(todolistId, title)
      if (res.data.resultCode === RequestResultsType.OK) {
        dispatch(tasksActions.createTask({ todolistId, task: res.data.data.item }))
        dispatch(appActions.setAppLoadingStatus({ status: 'succeeded' }))
      } else {
        handleServerError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        const errorMessage = e.response ? e.response.data.message : e.message
        handleServerNetworkError(dispatch, errorMessage)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }
export const updateTaskTC =
  (todolistId: string, taskId: string, task: TaskModelType): AppThunk =>
  async (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
    const ourTask = getState().tasks[todolistId].find((t) => t.id === taskId)
    const updatedTask = {
      title: ourTask?.title,
      description: ourTask?.description,
      status: ourTask?.status,
      priority: ourTask?.priority,
      startDate: ourTask?.startDate,
      deadline: ourTask?.deadline,
      ...task,
    }
    dispatch(appActions.setAppLoadingStatus({ status: 'loading' }))
    try {
      const res = await TasksApi.updateTask(todolistId, taskId, updatedTask)
      if (res.data.resultCode === RequestResultsType.OK) {
        dispatch(tasksActions.updateTask({ todolistId, taskId, taskModel: task }))
        dispatch(appActions.setAppLoadingStatus({ status: 'succeeded' }))
      } else {
        handleServerError(dispatch, res.data)
      }
    } catch (e) {
      if (axios.isAxiosError<ErrorType>(e)) {
        const errorMessage = e.response ? e.response.data.message : e.message
        handleServerNetworkError(dispatch, errorMessage)
      } else {
        handleServerNetworkError(dispatch, (e as Error).message)
      }
    }
  }

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions

export type TasksInitialStateType = ReturnType<typeof slice.getInitialState>
export type TaskDomainType = TaskType & {
  loadingStatus: RequestStatusType
}
export type AllTasksType = {
  [todolistId: string]: Array<TaskDomainType>
}
