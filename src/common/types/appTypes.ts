export type BaseResponseType<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
  fieldsErrors: FieldErrorType[]
}

export type FieldErrorType = {
  field: string
  error: string
}