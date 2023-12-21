import { Dispatch } from 'redux'
import { ResponseType } from 'common/types/appTypes'
import { appActions } from 'features/App/appReducer'

export const handleServerError = <D>(dispatch: Dispatch, res: ResponseType<D>) => {
  if (res.messages.length) {
    dispatch(appActions.setAppError({ error: res.messages[0] }))
  } else {
    dispatch(appActions.setAppError({ error: 'Some error' }))
  }
  dispatch(appActions.setAppLoadingStatus({ status: 'failed' }))
}
