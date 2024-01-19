import {TodolistApi, TodolistType} from 'features/TodolistsList/Todolist/todolistApi'
import {appActions, RequestStatusType} from 'features/App/appReducer'
import {handleServerError} from 'common/utils/handleServerError'
import {createSlice, PayloadAction} from '@reduxjs/toolkit'
import {tasksThunks} from 'features/TodolistsList/Todolist/Task/tasksReducer'
import {handleServerNetworkError} from 'common/utils/handleServerNetworkError'
import {RequestResultsType} from 'common/enums'

const slice = createSlice({
  name: 'todolists', initialState: {
    todolists: [] as TodolistDomainType[],
  }, reducers: {
    changeTodolistFilter: (state, action: PayloadAction<{ todolistId: string; filter: FilterType }>) => {
      const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) {
        state.todolists[index].filter = action.payload.filter
      }
    },
    changeTodolistTitle: (state, action: PayloadAction<{ todolistId: string; title: string }>) => {
      const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) {
        state.todolists[index].title = action.payload.title
      }
    },
    changeTodolistLoadingStatus: (state, action: PayloadAction<{ todolistId: string; loadingStatus: RequestStatusType }>,) => {
      const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) {
        state.todolists[index].loadingStatus = action.payload.loadingStatus
      }
    },
    deleteTodolist: (state, action: PayloadAction<{ todolistId: string }>) => {
      const index = state.todolists.findIndex((todo) => todo.id === action.payload.todolistId)
      if (index !== -1) {
        state.todolists.splice(index, 1)
      }
    },
    createTodolist: (state, action: PayloadAction<{ todolist: TodolistType }>) => {
      const newTotolist: TodolistDomainType = {...action.payload.todolist, filter: 'all', loadingStatus: 'idle'}
      state.todolists.unshift(newTotolist)
    },
    setTodolists: (state, action: PayloadAction<{ todolists: TodolistType[] }>) => {
      state.todolists = action.payload.todolists.map((todo) => ({...todo, filter: 'all', loadingStatus: 'idle'}))
    },
    clearData: (state) => {
      state.todolists = []
    },
  },
})

export const getTodolistsTC = () => async (dispatch: any) => {
  dispatch(appActions.setAppLoadingStatus({status: 'loading'}))
  try {
    const resTodos = await TodolistApi.getTodolists()
    dispatch(todolistsActions.setTodolists({todolists: resTodos.data}))
    for (const todo of resTodos.data) {
      dispatch(tasksThunks.fetchTask(todo.id))
    }
    dispatch(appActions.setAppLoadingStatus({status: 'succeeded'}))
  } catch (e) {
    handleServerNetworkError(dispatch, e)
  }
}

export const createTodolistTC = (title: string) => async (dispatch: any) => {
  dispatch(appActions.setAppLoadingStatus({status: 'loading'}))
  try {
    const res = await TodolistApi.createTodolist(title)
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(todolistsActions.createTodolist({todolist: res.data.data.item}))
      dispatch(appActions.setAppLoadingStatus({status: 'succeeded'}))
    } else {
      handleServerError(dispatch, res.data)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e)
  }
}

export const deleteTodolistTC = (todolistId: string) => async (dispatch: any) => {
  dispatch(appActions.setAppLoadingStatus({status: 'loading'}))
  dispatch(todolistsActions.changeTodolistLoadingStatus({todolistId, loadingStatus: 'loading'}))
  try {
    const res = await TodolistApi.deleteTodolist(todolistId)
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(todolistsActions.deleteTodolist({todolistId}))
      dispatch(appActions.setAppLoadingStatus({status: 'succeeded'}))
    } else {
      handleServerError(dispatch, res.data)
      dispatch(todolistsActions.changeTodolistLoadingStatus({todolistId, loadingStatus: 'failed'}))
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e)
    dispatch(todolistsActions.changeTodolistLoadingStatus({todolistId, loadingStatus: 'failed'}))
  }
}
export const updateTodolistTC = (todolistId: string, title: string) => async (dispatch: any) => {
  dispatch(appActions.setAppLoadingStatus({status: 'loading'}))
  try {
    const res = await TodolistApi.updateTodolist(todolistId, title)
    if (res.data.resultCode === 0) {
      dispatch(todolistsActions.changeTodolistTitle({todolistId, title}))
      dispatch(appActions.setAppLoadingStatus({status: 'succeeded'}))
    } else {
      handleServerError(dispatch, res.data)
    }
  } catch (e) {
    handleServerNetworkError(dispatch, e)
  }
}

export const todolistsReducer = slice.reducer
export const todolistsActions = slice.actions

export type FilterType = 'all' | 'active' | 'completed'
export type TodolistDomainType = TodolistType & {
  filter: FilterType
  loadingStatus: RequestStatusType
}
export type TodolistsInitialStateType = ReturnType<typeof slice.getInitialState>
