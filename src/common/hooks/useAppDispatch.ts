import { useDispatch } from 'react-redux'
import { AppDispatchType } from 'features/App/store'

export const useAppDispatch = () => useDispatch<AppDispatchType>()
