import {ErrorType, RequestResultsType, TodolistApi} from "../../api/todolist-api";
import {
  changeTodolistLoadingStatusAC,
  changeTodolistTitleAC,
  createTodolistAC,
  deleteTodolistAC,
  setTodolistsAC
} from "../actions/todolistsActions";
import {AppDispatchType, AppThunk} from "../../components/App/redux-store";
import {setAppLoadingStatusAC} from "../Reducers/appReducer";
import {handleServerError, handleServerNetworkError} from "../../utils/utils";
import axios from "axios";
import {getTasksTC} from "./thunksTasks";

export const getTodolistsTC = (): AppThunk => async (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))
  try {
    const resTodos = await TodolistApi.getTodolists()
    dispatch(setTodolistsAC(resTodos.data))
    for (const todo of resTodos.data) {
      dispatch(getTasksTC(todo.id))
    }
    dispatch(setAppLoadingStatusAC('succeeded'))
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const errorMessage = e.response ? e.response.data.message : e.message
      debugger
      handleServerNetworkError(dispatch, errorMessage)
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
    }
  }
}
export const createTodolistTC = (title: string): AppThunk => async (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))
  try {
    const res = await TodolistApi.createTodolist(title)
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(createTodolistAC(res.data.data.item))
      dispatch(setAppLoadingStatusAC('succeeded'))
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
export const deleteTodolistTC = (todolistId: string): AppThunk => async (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))
  dispatch(changeTodolistLoadingStatusAC(todolistId, 'loading'))
  try {
    const res = await TodolistApi.deleteTodolist(todolistId)
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(deleteTodolistAC(todolistId))
      dispatch(setAppLoadingStatusAC('succeeded'))
    } else {
      handleServerError(dispatch, res.data)
      dispatch(changeTodolistLoadingStatusAC(todolistId, 'failed'))
    }
  } catch (e) {
    if (axios.isAxiosError<ErrorType>(e)) {
      const errorMessage = e.response ? e.response.data.message : e.message
      handleServerNetworkError(dispatch, errorMessage)
      dispatch(changeTodolistLoadingStatusAC(todolistId, 'failed'))
    } else {
      handleServerNetworkError(dispatch, (e as Error).message)
      dispatch(changeTodolistLoadingStatusAC(todolistId, 'failed'))
    }
  }
}
export const updateTodolistTC = (todolistId: string, title: string): AppThunk => async (dispatch: AppDispatchType) => {
  dispatch(setAppLoadingStatusAC('loading'))
  try {
    const res = await TodolistApi.updateTodolist(todolistId, title)
    if (res.data.resultCode === 0) {
      dispatch(changeTodolistTitleAC(todolistId, title))
      dispatch(setAppLoadingStatusAC('succeeded'))
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