import { BaseThunkAPI } from '@reduxjs/toolkit/dist/createAsyncThunk'
import { BaseResponse } from 'common/types'
import { AppDispatchType, AppRootStateType } from 'features/App/store'
import { appActions } from 'features/App/model/appReducer'
import { handleServerNetworkError } from './handleServerNetworkError'

/**
 * Обертка для асинхронных thunk-функций, предназначенная для обработки ошибок и управления состоянием загрузки.
 *
 * @template T - тип возвращаемого значения функции logic.
 * @param {BaseThunkAPI} thunkAPI - объект, предоставляющий доступ к методам dispatch, rejectWithValue и getState.
 * @param {Function} logic - асинхронная функция, выполняющая основную логику thunk-функции.
 * @returns - промис, содержащий результат выполнения функции logic
 *    или объект с ошибкой, если произошла ошибка.
 */

export const thunkTryCatch = async <T>(
  thunkAPI: BaseThunkAPI<AppRootStateType, unknown, AppDispatchType, null | BaseResponse>,
  logic: () => Promise<T>,
): Promise<T | ReturnType<typeof thunkAPI.rejectWithValue>> => {
  const { dispatch, rejectWithValue } = thunkAPI
  dispatch(appActions.setAppLoadingStatus({ status: 'loading' }))
  try {
    return await logic()
  } catch (e) {
    handleServerNetworkError(dispatch, e)
    return rejectWithValue(null)
  } finally {
    dispatch(appActions.setAppLoadingStatus({ status: 'idle' }))
  }
}
