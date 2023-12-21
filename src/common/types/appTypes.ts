export type ResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
}

export type ErrorType = {
  statusCode: number
  message: string
  error: string
}