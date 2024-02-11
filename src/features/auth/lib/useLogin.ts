import { useAppSelector } from 'common/hooks'
import { useFormik } from 'formik'
import { authThunks } from 'features/auth/model/authReducer'
import { BaseResponse } from 'common/types'
import { FormikErrorType } from 'features/auth/ui/Login'
import { useActions } from 'common/hooks/useActions'

export const useLogin = () => {
  const { login } = useActions(authThunks)
  const isLoggedIn = useAppSelector((state) => state.auth.isLoggedIn)
  const formik = useFormik({
    initialValues: {
      email: '',
      password: '',
      rememberMe: false,
    },
    validate: (values) => {
      const errors: FormikErrorType = {}
      if (!values.email) {
        errors.email = 'Required'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Must be 3 characters or more'
      }
      return errors
    },
    onSubmit: (values, formikHelpers) => {
      login(values)
        .unwrap()
        .catch((res: BaseResponse) => {
          res.fieldsErrors?.forEach((fieldError) => {
            formikHelpers.setFieldError(fieldError.field, fieldError.error)
          })
        })
    },
  })
  return { isLoggedIn, formik }
}
