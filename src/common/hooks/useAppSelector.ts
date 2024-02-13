import { TypedUseSelectorHook, useSelector } from 'react-redux'
import { AppRootState } from 'features/App/store'

export const useAppSelector: TypedUseSelectorHook<AppRootState> = useSelector
