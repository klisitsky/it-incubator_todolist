import React, {useEffect} from 'react';
import './App.css';
import ButtonAppBar from "../AppBar/ButtonAppBar";
import TodolistsList from "../TodolistsList/TodolistsList";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppDispatch, useAppSelector} from "./redux-store";
import {RequestStatusType} from "../../redux/Reducers/appReducer";
import {AppSnackbar} from "../SnackBar/SnackBar";
import {Login} from "../Login/Login";
import {Route, Routes, Navigate} from "react-router-dom";
import {meTC} from "../../redux/Reducers/authReducer";
import CircularProgress from "@mui/material/CircularProgress";

const App = React.memo(() => {

  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  const isInitialized = useAppSelector<boolean>(state => state.app.isInitialized)
  const dispatch = useAppDispatch()

  useEffect(() => {
    dispatch(meTC())
  }, [])

  if (!isInitialized) {
    return <div
      style={{position: 'fixed', top: '30%', textAlign: 'center', width: '100%'}}>
      <CircularProgress/>
    </div>
  }

  return (<>
      <ButtonAppBar/>
      {status === 'loading' && <LinearProgress/>}
      <Routes>
        <Route path={'/'} element={<TodolistsList/>}></Route>
        <Route path={'/login'} element={<Login/>}></Route>
        <Route path={'/404'} element={<h1>404 PAGE NOT FOUND</h1>}></Route>
        <Route path={'*'} element={<Navigate to={'/404'}/>}></Route>
      </Routes>
      <AppSnackbar/>
    </>
  )
})

export default App;
