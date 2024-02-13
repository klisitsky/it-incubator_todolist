import {
  deleteTaskPayload,
  Task,
  TaskModel,
  TasksApi,
  updateTaskPayload,
} from 'features/TodolistsList/Todolist/Task/api/tasksApi'
import { RequestStatus } from 'features/App/model/appSlice'
import { createSlice, isFulfilled, isPending, isRejected } from '@reduxjs/toolkit'
import { todolistsActions, todolistsThunks } from 'features/TodolistsList/Todolist/model/todolistsSlice'
import { createAppAsyncThunk } from 'common/utils'
import { RequestResults } from 'common/enums'

const slice = createSlice({
  name: 'tasks',
  initialState: {} as AllTasks,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(updateTask.fulfilled, (state, action) => {
        const tasksList = state[action.payload.todolistId]
        const index = tasksList.findIndex((task) => task.id === action.payload.taskId)
        if (index !== -1) {
          tasksList[index] = {
            ...tasksList[index],
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
      .addMatcher(isPending(deleteTask, updateTask), (state, action) => {
        const tasksList = state[action.meta.arg.todolistId]
        const index = tasksList.findIndex((task) => task.id === action.meta.arg.taskId)
        tasksList[index].loadingStatus = 'loading'
      })
      .addMatcher(isFulfilled(updateTask), (state, action) => {
        const tasksList = state[action.meta.arg.todolistId]
        const index = tasksList.findIndex((task) => task.id === action.meta.arg.taskId)
        tasksList[index].loadingStatus = 'succeeded'
      })
      .addMatcher(isRejected(deleteTask, updateTask), (state, action) => {
        const tasksList = state[action.meta.arg.todolistId]
        const index = tasksList.findIndex((task) => task.id === action.meta.arg.taskId)
        tasksList[index].loadingStatus = 'failed'
      })
  },
})

const fetchTasks = createAppAsyncThunk<{ todolistId: string; tasks: Task[] }, string>(
  'tasks/fetchTasks',
  async (todolistId) => {
    const res = await TasksApi.getTasks(todolistId)
    return { todolistId, tasks: res.data.items }
  },
)

const deleteTask = createAppAsyncThunk<deleteTaskPayload, deleteTaskPayload>(
  'tasks/deleteTask',
  async (arg, { rejectWithValue }) => {
    const res = await TasksApi.deleteTask({ todolistId: arg.todolistId, taskId: arg.taskId })
    if (res.data.resultCode === RequestResults.OK) {
      return { todolistId: arg.todolistId, taskId: arg.taskId }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const createTask = createAppAsyncThunk<{ task: Task }, { todolistId: string; title: string }>(
  'tasks/createTask',
  async (arg, { rejectWithValue }) => {
    const res = await TasksApi.createTask(arg.todolistId, arg.title)
    if (res.data.resultCode === RequestResults.OK) {
      return { task: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const updateTask = createAppAsyncThunk<updateTaskPayload, updateTaskPayload>(
  'tasks/updateTask',
  async (arg, { rejectWithValue, getState }) => {
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
    const res = await TasksApi.updateTask({ todolistId: arg.todolistId, taskId: arg.taskId, taskModel: updatedTask })
    if (res.data.resultCode === RequestResults.OK) {
      return { todolistId: arg.todolistId, taskId: arg.taskId, taskModel: arg.taskModel }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const tasksSlice = slice.reducer
export const tasksThunks = { fetchTasks, deleteTask, createTask, updateTask }

export type TaskDomain = Task & {
  loadingStatus: RequestStatus
}

export type AllTasks = Record<string, TaskDomain[]>
