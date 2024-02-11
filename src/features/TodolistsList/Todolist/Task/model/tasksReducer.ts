import {
  deleteTaskPayload,
  TaskModel,
  TasksApi,
  Task,
  updateTaskPayload,
} from 'features/TodolistsList/Todolist/Task/api/tasksApi'
import { appActions, RequestStatus } from 'features/App/model/appReducer'
import { createSlice } from '@reduxjs/toolkit'
import { todolistsActions, todolistsThunks } from 'features/TodolistsList/Todolist/model/todolistsReducer'
import { createAppAsyncThunk, handleServerError, handleServerNetworkError } from 'common/utils'
import { RequestResultsType } from 'common/enums'
import { thunkTryCatch } from 'common/utils/thunkTryCatch'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as AllTasks,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.fulfilled, (state, action) => {
        const TasksList = state[action.payload.todolistId]
        const index = TasksList.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          TasksList[index] = {
            ...TasksList[index],
            ...action.payload.taskModel,
          }
        }
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const newTask: TaskDomain = { ...action.payload.task, loadingStatus: 'idle' }
        state[action.payload.task.todoListId].unshift(newTask)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          state[action.payload.todolistId].splice(index, 1)
        }
      })
      .addCase(fetchTasks.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((task) => ({ ...task, loadingStatus: 'idle' }))
      })
      .addCase(todolistsThunks.createTodolist.fulfilled, (state, action) => {
        state[action.payload.todolist.id] = []
      })
      .addCase(todolistsThunks.deleteTodolist.fulfilled, (state, action) => {
        delete state[action.payload.todolistId]
      })
      .addCase(todolistsThunks.fetchTodolists.fulfilled, (state, action) => {
        action.payload.todolists.map((todo) => {
          state[todo.id] = []
        })
      })
      .addCase(todolistsActions.clearData, () => {
        return {}
      })
  },
})

const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: Task[] }, string>(
  'tasks/fetchTasks',
  async (todolistId, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const res = await TasksApi.getTasks(todolistId)
      return { todolistId, tasks: res.data.items }
    })
  },
)

const deleteTask = createAppAsyncThunk<deleteTaskPayload, deleteTaskPayload>(
  'tasks/deleteTask',
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      dispatch(appActions.setAppLoadingStatus({ status: 'loading' }))
      dispatch(updateTask({ todolistId: arg.todolistId, taskId: arg.taskId, taskModel: { loadingStatus: 'loading' } }))
      const res = await TasksApi.deleteTask({ todolistId: arg.todolistId, taskId: arg.taskId })
      if (res.data.resultCode === RequestResultsType.OK) {
        dispatch(appActions.setAppLoadingStatus({ status: 'succeeded' }))
        return { todolistId: arg.todolistId, taskId: arg.taskId }
      } else {
        dispatch(appActions.setAppLoadingStatus({ status: 'failed' }))
        dispatch(updateTask({ todolistId: arg.todolistId, taskId: arg.taskId, taskModel: { loadingStatus: 'failed' } }))
        handleServerError(dispatch, res.data)
        return rejectWithValue(null)
      }
    } catch (error) {
      dispatch(appActions.setAppLoadingStatus({ status: 'failed' }))
      dispatch(updateTask({ todolistId: arg.todolistId, taskId: arg.taskId, taskModel: { loadingStatus: 'failed' } }))
      handleServerNetworkError(dispatch, error)
      return rejectWithValue(null)
    }
  },
)

const createTask = createAppAsyncThunk<{ task: Task }, { todolistId: string; title: string }>(
  'tasks/createTask',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await TasksApi.createTask(arg.todolistId, arg.title)
      if (res.data.resultCode === RequestResultsType.OK) {
        return { task: res.data.data.item }
      } else {
        handleServerError(dispatch, res.data, false)
        return rejectWithValue(res.data)
      }
    })
  },
)

const updateTask = createAppAsyncThunk<updateTaskPayload, updateTaskPayload>(
  'tasks/updateTask',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue, getState } = thunkAPI
    const taskFromState = getState().tasks[arg.todolistId].find((t: Task) => t.id === arg.taskId)
    if (!taskFromState) {
      return rejectWithValue(null)
    }
    const updatedTask: TaskModel = {
      title: taskFromState.title,
      description: taskFromState.description,
      status: taskFromState.status,
      priority: taskFromState.priority,
      startDate: taskFromState.startDate,
      deadline: taskFromState.deadline,
      ...arg.taskModel,
    }
    return thunkTryCatch(thunkAPI, async () => {
      const res = await TasksApi.updateTask({ todolistId: arg.todolistId, taskId: arg.taskId, taskModel: updatedTask })
      if (res.data.resultCode === RequestResultsType.OK) {
        return { todolistId: arg.todolistId, taskId: arg.taskId, taskModel: arg.taskModel }
      } else {
        handleServerError(dispatch, res.data)
        return rejectWithValue(null)
      }
    })
  },
)

export const tasksReducer = slice.reducer
export const tasksThunks = { fetchTasks, deleteTask, createTask, updateTask }

export type TaskDomain = Task & {
  loadingStatus: RequestStatus
}

export type AllTasks = Record<string, TaskDomain[]>
