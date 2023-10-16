export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type setAppStatusActionType = ReturnType<typeof setAppLoadingStatusAC>
export type setAppErrorActionType = ReturnType<typeof setAppErrorAC>

export type AppActionsType =
  | setAppStatusActionType
  | setAppErrorActionType


const initialState = {
  error: null as null | string,
  status: 'idle' as RequestStatusType
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    default:
      return state
  }
}

export const setAppLoadingStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)

