import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { useFormik } from 'formik'
import { useAppDispatch, useAppSelector } from 'components/App/redux-store'
import { loginTC } from 'redux/Reducers/authReducer'
import { Navigate } from 'react-router-dom'

type FormikErrorType = {
  email?: string
  password?: string
  rememberMe?: boolean
}

export type LoginParamsType = {
  email: string
  password: string
  rememberMe?: boolean
  captcha?: boolean
}

export const Login = () => {
  const dispatch = useAppDispatch()
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
      } else if (!/^[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,4}$/i.test(values.email)) {
        errors.email = 'Invalid email address'
      }
      if (!values.password) {
        errors.password = 'Required'
      } else if (values.password.length < 3) {
        errors.password = 'Must be 3 characters or more'
      }
      return errors
    },
    onSubmit: (values) => {
      dispatch(loginTC(values))
    },
  })

  if (isLoggedIn) {
    return <Navigate to={'/'} />
  }

  return (
    <Grid
      container
      justifyContent={'center'}>
      <Grid
        item
        justifyContent={'center'}>
        <FormLabel>
          <p>
            To log in get registered
            <a
              href={'https://social-network.samuraijs.com/'}
              target={'_blank'}>
              {' '}
              here
            </a>
          </p>
          <p>or use common test account credentials:</p>
          <p>Email: free@samuraijs.com</p>
          <p>Password: free</p>
        </FormLabel>
        <form onSubmit={formik.handleSubmit}>
          <FormGroup>
            <TextField
              label='Email'
              margin='normal'
              type='email'
              {...formik.getFieldProps('email')}
            />
            {formik.touched.email && formik.errors.email ? (
              <span style={{ color: 'red' }}>{formik.errors.email}</span>
            ) : null}
            <TextField
              type='password'
              label='Password'
              margin='normal'
              {...formik.getFieldProps('password')}
            />
            {formik.touched.password && formik.errors.password ? (
              <span style={{ color: 'red' }}>{formik.errors.password}</span>
            ) : null}
            <FormControlLabel
              label={'Remember me'}
              control={<Checkbox />}
              {...formik.getFieldProps('rememberMe')}
            />
            <Button
              type={'submit'}
              variant={'contained'}
              color={'primary'}>
              Login
            </Button>
          </FormGroup>
        </form>
      </Grid>
    </Grid>
  )
}
