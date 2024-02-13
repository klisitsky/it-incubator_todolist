import { AxiosResponse } from 'axios'
import { instanse } from 'common/api/baseApi'
import { User } from 'features/TodolistsList/Todolist/api/todolistApi'
import { BaseResponse } from 'common/types/appTypes'

export const authAPI = {
  me() {
    return instanse.get<BaseResponse<User>, AxiosResponse<BaseResponse<User>>>('auth/me')
  },
  login(payLoad: LoginParams) {
    return instanse.post<
      BaseResponse<{ userId: number }>,
      AxiosResponse<BaseResponse<{ userId: number }>>,
      LoginParams
    >('auth/login', payLoad)
  },
  logOut() {
    return instanse.delete<BaseResponse>('auth/login')
  },
}

// types

export type LoginParams = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}
