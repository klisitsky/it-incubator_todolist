import React, { useEffect } from 'react'
import './App.css'
import LinearProgress from '@mui/material/LinearProgress'
import { Route, Routes, Navigate } from 'react-router-dom'
import CircularProgress from '@mui/material/CircularProgress'
import { AppSnackbar, ButtonAppBar } from 'common/components'
import { Login, TodolistsList } from 'features'
import { initializeAppTC, RequestStatusType } from './appReducer'
import { useAppDispatch, useAppSelector } from 'common/hooks'

export const App = React.memo(() => {
  const status = useAppSelector<RequestStatusType>((state) => state.app.status)
  const isInitialized = useAppSelector<boolean>((state) => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(initializeAppTC())
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
