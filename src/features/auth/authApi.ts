import { AxiosResponse } from 'axios'
import { instanse } from 'common/api/baseApi'
import { UserType } from 'features/TodolistsList/Todolist/todolistApi'
import { BaseResponseType } from 'common/types/appTypes'

export const authAPI = {
  me() {
    return instanse.get<BaseResponseType<UserType>, AxiosResponse<BaseResponseType<UserType>>>('auth/me')
  },
  login(payLoad: LoginParamsType) {
    return instanse.post<
      BaseResponseType<{ userId: number }>,
      AxiosResponse<BaseResponseType<{ userId: number }>>,
      LoginParamsType
    >('auth/login', payLoad)
  },
  logOut() {
    return instanse.delete<BaseResponseType>('auth/login')
  },
}


// types

export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}