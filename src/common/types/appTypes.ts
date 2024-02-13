export type BaseResponse<D = {}> = {
  resultCode: number
  messages: string[]
  data: D
  fieldsErrors: FieldError[]
}

export type FieldError = {
  field: string
  error: string
}
