import { TodolistApi, Todolist, updateTaskPayload } from 'features/TodolistsList/Todolist/api/todolistApi'
import { RequestStatus } from 'features/App/model/appSlice'
import { createSlice, isFulfilled, isPending, isRejected, PayloadAction } from '@reduxjs/toolkit'
import { RequestResults } from 'common/enums'
import { createAppAsyncThunk } from 'common/utils'

const slice = createSlice({
  name: 'todolists',
  initialState: {
    todolists: [] as TodolistDomain[],
  },
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: Filter }>) => {
      const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) {
        state.todolists[index].filter = action.payload.filter
      }
    },
    changeTodolistLoadingStatus: (
      state,
      action: PayloadAction<{ todolistId: string; loadingStatus: RequestStatus }>,
    ) => {
      const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) {
        state.todolists[index].loadingStatus = action.payload.loadingStatus
      }
    },
    clearData: (state) => {
      state.todolists = []
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchTodolists.fulfilled, (state, action) => {
        state.todolists = action.payload.todolists.map((todo) => ({ ...todo, filter: 'all', loadingStatus: 'idle' }))
      })
      .addCase(createTodolist.fulfilled, (state, action) => {
        const newTotolist: TodolistDomain = { ...action.payload.todolist, filter: 'all', loadingStatus: 'idle' }
        state.todolists.unshift(newTotolist)
      })
      .addCase(deleteTodolist.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId)
        if (index !== -1) {
          state.todolists.splice(index, 1)
        }
      })
      .addCase(updateTodolistTitle.fulfilled, (state, action) => {
        const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId)
        if (index !== -1) {
          state.todolists[index].title = action.payload.title
        }
      })
      .addMatcher(isPending(deleteTodolist, updateTodolistTitle), (state, action) => {
        const index = state.todolists.findIndex((todo) => todo.id === action.meta.arg)
        if (index !== -1) {
          state.todolists[index].loadingStatus = 'loading'
        }
      })
      .addMatcher(isFulfilled(updateTodolistTitle), (state, action) => {
        const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId)
        if (index !== -1) {
          state.todolists[index].loadingStatus = 'succeeded'
        }
      })
      .addMatcher(isRejected(deleteTodolist, updateTodolistTitle), (state, action) => {
        console.log(action)
        const index = state.todolists.findIndex((todo) => todo.id === action.meta.arg)
        if (index !== -1) {
          state.todolists[index].loadingStatus = 'failed'
        }
      })
  },
})

const fetchTodolists = createAppAsyncThunk<{ todolists: Todolist[] }, undefined>(
  'todolists/fetchTodolists',
  async () => {
    const resTodos = await TodolistApi.getTodolists()
    return { todolists: resTodos.data }
  },
)

const createTodolist = createAppAsyncThunk<{ todolist: Todolist }, string>(
  'todolists/createTodolist',
  async (arg, { rejectWithValue }) => {
    const res = await TodolistApi.createTodolist(arg)
    if (res.data.resultCode === RequestResults.OK) {
      return { todolist: res.data.data.item }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  'todolists/deleteTodolist',
  async (arg, { rejectWithValue }) => {
    const res = await TodolistApi.deleteTodolist(arg)
    if (res.data.resultCode === RequestResults.OK) {
      return { todolistId: arg }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

const updateTodolistTitle = createAppAsyncThunk<updateTaskPayload, updateTaskPayload>(
  'todolists/updateTodolist',
  async ({ todolistId, title }, { rejectWithValue }) => {
    const res = await TodolistApi.updateTodolist({ todolistId, title })
    if (res.data.resultCode === 0) {
      return { todolistId, title }
    } else {
      return rejectWithValue(res.data)
    }
  },
)

export const todolistsSlice = slice.reducer
export const todolistsActions = slice.actions

export const todolistsThunks = { fetchTodolists, createTodolist, deleteTodolist, updateTodolistTitle }

export type Filter = 'all' | 'active' | 'completed'
export type TodolistDomain = Todolist & {
  filter: Filter
  loadingStatus: RequestStatus
}
export type TodolistsInitialStateType = ReturnType<typeof slice.getInitialState>
