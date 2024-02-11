import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { AppRootStateType } from 'features/App/store'

export const useAppSelector: TypedUseSelectorHook<AppRootStateType> = useSelector
