import { useDispatch } from 'react-redux'
import { AppDispatch } from 'features/App/store'

export const useAppDispatch = () => useDispatch<AppDispatch>()
