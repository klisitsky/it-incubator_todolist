import React, { useEffect } from 'react'
import 'features/App/ui/App.css'
import LinearProgress from '@mui/material/LinearProgress'
import { Navigate, Route, Routes } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { AppSnackbar, ButtonAppBar } from 'common/components'
import { Login, TodolistsList } from 'features/index'
import { RequestStatus } from 'features/App/model/appReducer'
import { useAppSelector } from 'common/hooks'
import { authThunks } from 'features/auth/model/authReducer'
import { useActions } from 'common/hooks/useActions'

export const App = React.memo(() => {
  const status = useAppSelector<RequestStatus>((state) => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  const { initializeApp } = useActions(authThunks)

  useEffect(() => {
    initializeApp()
  }, [])

  if (!isInitialized) {
    return (
      <div style={{ position: 'fixed', top: '30%', textAlign: 'center', width: '100%' }}>
        <CircularProgress />
      </div>
    )
  }

  return (
    <>
      <ButtonAppBar />
      {status === 'loading' && <LinearProgress />}
      <Routes>
        <Route
          path={'/'}
          element={<TodolistsList />}></Route>
        <Route
          path={'/login'}
          element={<Login />}></Route>
        <Route
          path={'/404'}
          element={<h1>404 PAGE NOT FOUND</h1>}></Route>
        <Route
          path={'*'}
          element={<Navigate to={'/404'} />}></Route>
      </Routes>
      <AppSnackbar />
    </>
  )
})
