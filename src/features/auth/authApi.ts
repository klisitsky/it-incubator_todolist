import { AxiosResponse } from 'axios'
import { instanse } from 'common/api/baseApi'
import { UserType } from 'features/TodolistsList/Todolist/todolistApi'
import { LoginParamsType } from 'features/auth/Login'
import { ResponseType } from 'common/types/appTypes'

export const authAPI = {
  me() {
    return instanse.get<ResponseType<UserType>, AxiosResponse<ResponseType<UserType>>>('auth/me')
  },
  login(payLoad: LoginParamsType) {
    return instanse.post<
      ResponseType<{ userId: number }>,
      AxiosResponse<ResponseType<{ userId: number }>>,
      LoginParamsType
    >('auth/login', payLoad)
  },
  logOut() {
    return instanse.delete<ResponseType>('auth/login')
  },
}
