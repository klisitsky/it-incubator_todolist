import { AxiosResponse } from 'axios'
import { instanse } from 'common/api/baseApi'
import { UserType } from 'features/TodolistsList/Todolist/api/todolistApi'
import { BaseResponse } from 'common/types/appTypes'

export const authAPI = {
  me() {
    return instanse.get<BaseResponse<UserType>, AxiosResponse<BaseResponse<UserType>>>('auth/me')
  },
  login(payLoad: LoginParamsType) {
    return instanse.post<
      BaseResponse<{ userId: number }>,
      AxiosResponse<BaseResponse<{ userId: number }>>,
      LoginParamsType
    >('auth/login', payLoad)
  },
  logOut() {
    return instanse.delete<BaseResponse>('auth/login')
  },
}

// types

export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}
