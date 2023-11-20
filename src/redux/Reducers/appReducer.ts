export type RequestStatusType = 'idle' | 'loading' | 'succeeded' | 'failed'

export type SetAppStatusActionType = ReturnType<typeof setAppLoadingStatusAC>
export type SetAppErrorActionType = ReturnType<typeof setAppErrorAC>
export type SetAppInitializingActionType = ReturnType<typeof setAppInitializingAC>

export type AppActionsType =
  | SetAppStatusActionType
  | SetAppErrorActionType
  | SetAppInitializingActionType


const initialState = {
  error: null as null | string,
  status: 'idle' as RequestStatusType,
  isInitialized: false
}

type InitialStateType = typeof initialState

export const appReducer = (state: InitialStateType = initialState, action: AppActionsType): InitialStateType => {
  switch (action.type) {
    case 'APP/SET-STATUS':
      return {...state, status: action.status}
    case 'APP/SET-ERROR':
      return {...state, error: action.error}
    case 'APP/SET-INITIALIZING':
      return {...state, isInitialized: action.isInitialized}
    default:
      return state
  }
}

export const setAppLoadingStatusAC = (status: RequestStatusType) => ({type: 'APP/SET-STATUS', status} as const)
export const setAppErrorAC = (error: string | null) => ({type: 'APP/SET-ERROR', error} as const)
export const setAppInitializingAC = (isInitialized: boolean) => ({type: 'APP/SET-INITIALIZING', isInitialized} as const)

