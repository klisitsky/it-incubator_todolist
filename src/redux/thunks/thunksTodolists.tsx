import {RequestResultsType, TodolistApi} from "../../api/todolist-api";
import {
  changeTodolistLoadingStatusAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  setTodolists
} from "../actions/todolistsActions";
import {AppDispatchType, AppThunk} from "../../components/App/redux-store";
import {setAppLoadingStatusAC} from "../Reducers/appReducer";
import {handleServerError, handleServerNetworkError} from "../../utils/utils";

export const getTodolistsTC = (): AppThunk => (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))

  TodolistApi.getTodolists().then(data => {
    dispatch(setTodolists(data.data))
    dispatch(setAppLoadingStatusAC('succeeded'))
  }).catch(e => {
    handleServerNetworkError(dispatch, e.message)
  })
}
export const createTodolistTC = (title: string): AppThunk => (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))

  TodolistApi.createTodolist(title).then(res => {
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(createTodolistAC(res.data.data.item))
      dispatch(setAppLoadingStatusAC('succeeded'))
    } else {
      handleServerError(dispatch, res.data)
    }
  }).catch(e => {
    handleServerNetworkError(dispatch, e.message)
  })
}
export const deleteTodolistTC = (todolistId: string): AppThunk => (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))
  dispatch(changeTodolistLoadingStatusAC(todolistId, 'loading'))

  TodolistApi.deleteTodolist(todolistId)
    .then(res => {
      if (res.data.resultCode === RequestResultsType.OK) {
        dispatch(deleteTodolistAC(todolistId))
        dispatch(setAppLoadingStatusAC('succeeded'))
      } else {
        handleServerError(dispatch, res.data)
        dispatch(changeTodolistLoadingStatusAC(todolistId, 'failed'))
      }
    }).catch(e => {
    handleServerNetworkError(dispatch, e.message)
    dispatch(changeTodolistLoadingStatusAC(todolistId, 'failed'))
  })
}
export const updateTodolistTC = (todolistId: string, title: string): AppThunk => (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))

  TodolistApi.updateTodolist(todolistId, title).then(res => {
    if (res.data.resultCode === 0) {
      dispatch(changeTodolistTitleAC(todolistId, title))
      dispatch(setAppLoadingStatusAC('succeeded'))
    } else {
      handleServerError(dispatch, res.data)
    }
  }).catch(e => {
    handleServerNetworkError(dispatch, e.message)
  })
}