import {Dispatch} from 'redux'
import {BaseResponseType} from 'common/types/appTypes'
import {appActions} from 'features/App/appReducer'

/**
 * Обработчик ошибок сервера.
 *
 * @template D - тип данных, ожидаемых от сервера
 * @param dispatch - функция диспетчинга Redux
 * @param res - объект ответа от сервера
 * @param [showError=true] - флаг, определяющий, следует ли показывать сообщение об ошибке
 * @returns {void}
 */
export const handleServerError = <D>(dispatch: Dispatch, res: BaseResponseType<D>, showError: boolean = true): void => {
  if (showError) {
    dispatch(appActions.setAppError({ error: res.messages.length ? res.messages[0] : 'Some error' }));
  }
  dispatch(appActions.setAppLoadingStatus({ status: 'failed' }));
};
