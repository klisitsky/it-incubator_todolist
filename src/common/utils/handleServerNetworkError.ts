import axios from 'axios'
import { appActions } from 'features/App/model/appReducer'
import { AppDispatchType } from 'features/App/store'

/**
 * Обработчик ошибок, связанных с сервером и сетью.
 *
 * @param {AppDispatchType} dispatch - функция диспетча для отправки экшенов.
 * @param {unknown} err - объект ошибки.
 * @returns {void}
 */

export const handleServerNetworkError = (dispatch: AppDispatchType, err: unknown): void => {
  let errorMessage = 'Some error occurred'
  if (axios.isAxiosError(err)) {
    errorMessage = err.response?.data?.message || err?.message || errorMessage
  } else if (err instanceof Error) {
    errorMessage = `Native error: ${err.message}`
  } else {
    errorMessage = JSON.stringify(err)
  }

  dispatch(appActions.setAppError({ error: errorMessage }))
  dispatch(appActions.setAppLoadingStatus({ status: 'failed' }))
}
