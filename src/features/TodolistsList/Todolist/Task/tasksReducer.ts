import {
  deleteTaskType, TaskModelType, TasksApi, TaskType, updateTaskType,
} from 'features/TodolistsList/Todolist/Task/tasksApi'
import {appActions, RequestStatusType} from 'features/App/appReducer'
import {createSlice} from '@reduxjs/toolkit'
import {todolistsActions} from 'features/TodolistsList/Todolist/todolistsReducer'
import {createAppAsyncThunk, handleServerError, handleServerNetworkError} from 'common/utils'
import {RequestResultsType} from 'common/enums'
import {thunkTryCatch} from "common/utils/thunkTryCatch";

const slice = createSlice({
  name: 'tasks', initialState: {} as AllTasksType, reducers: {}, extraReducers: (builder) => {
    builder
      .addCase(updateTask.fulfilled, (state, action) => {
        const TasksList = state[action.payload.todolistId]
        const index = TasksList.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          TasksList[index] = {
            ...TasksList[index], ...action.payload.taskModel,
          }
        }
      })
      .addCase(createTask.fulfilled, (state, action) => {
        const newTask: TaskDomainType = {...action.payload.task, loadingStatus: 'idle'}
        state[action.payload.task.todoListId].unshift(newTask)
      })
      .addCase(deleteTask.fulfilled, (state, action) => {
        const index = state[action.payload.todolistId].findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          state[action.payload.todolistId].splice(index, 1)
        }
      })
      .addCase(fetchTask.fulfilled, (state, action) => {
        state[action.payload.todolistId] = action.payload.tasks.map((task) => ({...task, loadingStatus: 'idle'}))
      })
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
      .addCase(todolistsActions.clearData, () => {
        return {}
      })
  },
})

export const fetchTask = createAppAsyncThunk<{ todolistId: string; tasks: TaskType[] }, string>('tasks/fetchTasks', async (todolistId, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(appActions.setAppLoadingStatus({status: 'loading'}))
    const res = await TasksApi.getTasks(todolistId)
    dispatch(appActions.setAppLoadingStatus({status: 'succeeded'}))
    return {todolistId, tasks: res.data.items}
  } catch (error) {
    handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
},)

export const deleteTask = createAppAsyncThunk<deleteTaskType, deleteTaskType>('tasks/deleteTask', async (arg, {
  dispatch,
  rejectWithValue
}) => {
  try {
    dispatch(appActions.setAppLoadingStatus({status: 'loading'}))
    dispatch(updateTask({todolistId: arg.todolistId, taskId: arg.taskId, taskModel: {loadingStatus: 'loading'}}))
    const res = await TasksApi.deleteTask({todolistId: arg.todolistId, taskId: arg.taskId})
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(appActions.setAppLoadingStatus({status: 'succeeded'}))
      return {todolistId: arg.todolistId, taskId: arg.taskId}
    } else {
      dispatch(updateTask({todolistId: arg.todolistId, taskId: arg.taskId, taskModel: {loadingStatus: 'failed'}}))
      handleServerError(dispatch, res.data)
      return rejectWithValue(null)
    }
  } catch (error) {
    dispatch(updateTask({todolistId: arg.todolistId, taskId: arg.taskId, taskModel: {loadingStatus: 'failed'}}))
    handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
},)

export const createTask = createAppAsyncThunk<{ task: TaskType }, { todolistId: string; title: string }>('tasks/createTask', async (arg, thunkAPI) => {
  const {dispatch, rejectWithValue} = thunkAPI
  return thunkTryCatch(thunkAPI, async () => {
    const res = await TasksApi.createTask(arg.todolistId, arg.title)
    if (res.data.resultCode === RequestResultsType.OK) {
      return {task: res.data.data.item}
    } else {
      handleServerError(dispatch, res.data)
      return rejectWithValue(null)
    }
  })
})

export const updateTask = createAppAsyncThunk<updateTaskType, updateTaskType>('tasks/updateTask', async (arg, {
  dispatch,
  rejectWithValue,
  getState
}) => {
  const taskFromState = getState().tasks[arg.todolistId].find((t: TaskType) => t.id === arg.taskId)
  if (!taskFromState) {
    return rejectWithValue(null)
  }
  const updatedTask: TaskModelType = {
    title: taskFromState.title,
    description: taskFromState.description,
    status: taskFromState.status,
    priority: taskFromState.priority,
    startDate: taskFromState.startDate,
    deadline: taskFromState.deadline, ...arg.taskModel,
  }
  try {
    dispatch(appActions.setAppLoadingStatus({status: 'loading'}))
    const res = await TasksApi.updateTask({todolistId: arg.todolistId, taskId: arg.taskId, taskModel: updatedTask})
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(appActions.setAppLoadingStatus({status: 'succeeded'}))
      return {todolistId: arg.todolistId, taskId: arg.taskId, taskModel: arg.taskModel}
    } else {
      handleServerError(dispatch, res.data)
      return rejectWithValue(null)
    }
  } catch (error) {
    handleServerNetworkError(dispatch, error)
    return rejectWithValue(null)
  }
},)

export const tasksReducer = slice.reducer
export const tasksActions = slice.actions
export const tasksThunks = {fetchTask, deleteTask, createTask, updateTask}

export type TaskDomainType = TaskType & {
  loadingStatus: RequestStatusType
}
export type AllTasksType = {
  [todolistId: string]: Array<TaskDomainType>
}
