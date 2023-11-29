import { Dispatch } from 'redux'
import { ResponseType } from 'api/todolist-api'
import { appActions } from 'redux/Reducers/appReducer'

export const handleServerError = <D>(dispatch: Dispatch, res: ResponseType<D>) => {
  if (res.messages.length) {
    dispatch(appActions.setAppError({ error: res.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: 'Some error' }))
  }
  dispatch(appActions.setAppLoadingStatus({ status: 'failed' }))
}

export const handleServerNetworkError = (dispatch: Dispatch, message: string) => {
  debugger
  dispatch(appActions.setAppError({ error: message }))
  dispatch(appActions.setAppLoadingStatus({ status: 'failed' }))
}
