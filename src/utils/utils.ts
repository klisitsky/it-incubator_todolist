import {setAppErrorAC, setAppLoadingStatusAC} from "../redux/Reducers/appReducer";
import {Dispatch} from "redux";
import {ResponseType} from "../api/todolist-api";


export const handleServerError = <D>(dispatch: Dispatch, res: ResponseType<D>) => {
  if (res.messages.length) {
    dispatch(setAppErrorAC(res.messages[0]))
  } else {
    dispatch(setAppErrorAC('Some error'))
  }
  dispatch(setAppLoadingStatusAC('failed'))
}

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
  dispatch(setAppErrorAC(message))
  dispatch(setAppLoadingStatusAC('failed'))
}