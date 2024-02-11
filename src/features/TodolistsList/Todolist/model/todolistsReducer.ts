import { TodolistApi, TodolistType, updateTaskPayload } from 'features/TodolistsList/Todolist/api/todolistApi'
import { RequestStatus } from 'features/App/model/appReducer'
import { handleServerError } from 'common/utils/handleServerError'
import { createSlice, PayloadAction } from '@reduxjs/toolkit'
import { handleServerNetworkError } from 'common/utils/handleServerNetworkError'
import { RequestResultsType } from 'common/enums'
import { createAppAsyncThunk } from 'common/utils'
import { thunkTryCatch } from 'common/utils/thunkTryCatch'

const slice = createSlice({
  name: 'todolists',
  initialState: {
    todolists: [] as TodolistDomainType[],
  },
  reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
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
        const newTotolist: TodolistDomainType = { ...action.payload.todolist, filter: 'all', loadingStatus: 'idle' }
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
  },
})

const fetchTodolists = createAppAsyncThunk<{ todolists: TodolistType[] }, undefined>(
  'todolists/fetchTodolists',
  async (_, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const resTodos = await TodolistApi.getTodolists()
      return { todolists: resTodos.data }
    })
  },
)

const createTodolist = createAppAsyncThunk<{ todolist: TodolistType }, string>(
  'todolists/createTodolist',
  async (arg, thunkAPI) => {
    const { dispatch, rejectWithValue } = thunkAPI
    return thunkTryCatch(thunkAPI, async () => {
      const res = await TodolistApi.createTodolist(arg)
      if (res.data.resultCode === RequestResultsType.OK) {
        return { todolist: res.data.data.item }
      } else {
        handleServerError(dispatch, res.data)
        return rejectWithValue(null)
      }
    })
  },
)

const deleteTodolist = createAppAsyncThunk<{ todolistId: string }, string>(
  'todolists/deleteTodolist',
  async (arg, { dispatch, rejectWithValue }) => {
    try {
      dispatch(todolistsActions.changeTodolistLoadingStatus({ todolistId: arg, loadingStatus: 'loading' }))
      const res = await TodolistApi.deleteTodolist(arg)
      if (res.data.resultCode === RequestResultsType.OK) {
        dispatch(todolistsActions.changeTodolistLoadingStatus({ todolistId: arg, loadingStatus: 'succeeded' }))
        return { todolistId: arg }
      } else {
        handleServerError(dispatch, res.data)
        dispatch(todolistsActions.changeTodolistLoadingStatus({ todolistId: arg, loadingStatus: 'failed' }))
        return rejectWithValue(null)
      }
    } catch (e) {
      handleServerNetworkError(dispatch, e)
      dispatch(todolistsActions.changeTodolistLoadingStatus({ todolistId: arg, loadingStatus: 'failed' }))
      return rejectWithValue(null)
    }
  },
)

const updateTodolistTitle = createAppAsyncThunk<updateTaskPayload, updateTaskPayload>(
  'todolists/updateTodolist',
  async ({ todolistId, title }, thunkAPI) => {
    return thunkTryCatch(thunkAPI, async () => {
      const { dispatch, rejectWithValue } = thunkAPI
      const res = await TodolistApi.updateTodolist({ todolistId, title })
      if (res.data.resultCode === 0) {
        return { todolistId, title }
      } else {
        handleServerError(dispatch, res.data)
        return rejectWithValue(null)
      }
    })
  },
)

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

export const todolistsThunks = { fetchTodolists, createTodolist, deleteTodolist, updateTodolistTitle }

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
  loadingStatus: RequestStatus
}
export type TodolistsInitialStateType = ReturnType<typeof slice.getInitialState>
