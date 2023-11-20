import { Dispatch } from 'redux'
import {
  SetAppErrorActionType,
  setAppInitializingAC,
  SetAppInitializingActionType,
  setAppLoadingStatusAC,
  SetAppStatusActionType
} from './appReducer'
import {authAPI, ErrorType, RequestResultsType} from "../../api/todolist-api";
import {handleServerError, handleServerNetworkError} from "../../utils/utils";
import axios from "axios";
import {LoginParamsType} from "../../components/Login/Login";

const initialState = {
  isLoggedIn: false
}
type InitialStateType = typeof initialState

export const authReducer = (state: InitialStateType = initialState, action: ActionsType): InitialStateType => {
  switch (action.type) {
    case 'login/SET-IS-LOGGED-IN':
      return {...state, isLoggedIn: action.value}
    default:
      return state
  }
}
// actions
export const setIsLoggedInAC = (value: boolean) =>
  ({type: 'login/SET-IS-LOGGED-IN', value} as const)

// thunks
export const loginTC = (payLoad: LoginParamsType) => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppLoadingStatusAC('loading'))
  try {
    const res = await authAPI.login(payLoad)
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(setIsLoggedInAC(true))
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

export const logOutTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppLoadingStatusAC('loading'))
  try {
    const res = await authAPI.logOut()
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(setIsLoggedInAC(false))
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

export const meTC = () => async (dispatch: Dispatch<ActionsType>) => {
  dispatch(setAppLoadingStatusAC('loading'))
  try {
    const res = await authAPI.me()
    if (res.data.resultCode === RequestResultsType.OK) {
      dispatch(setIsLoggedInAC(true))
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
  } finally {
    dispatch(setAppInitializingAC(true))
  }
}

// types
type ActionsType =
  | ReturnType<typeof setIsLoggedInAC>
  | SetAppStatusActionType
  | SetAppErrorActionType
  | SetAppInitializingActionType