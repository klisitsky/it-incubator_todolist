import React from 'react'
import Grid from '@mui/material/Grid'
import Checkbox from '@mui/material/Checkbox'
import FormControlLabel from '@mui/material/FormControlLabel'
import FormGroup from '@mui/material/FormGroup'
import FormLabel from '@mui/material/FormLabel'
import TextField from '@mui/material/TextField'
import Button from '@mui/material/Button'
import { Navigate } from 'react-router-dom'
import { LoginParamsType } from 'features/auth/api/authApi'
import { useLogin } from '../lib/useLogin'

export type FormikErrorType = Partial<Omit<LoginParamsType, 'captcha'>>

export const Login = () => {
  const { isLoggedIn, formik } = useLogin()

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
              type='text'
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
