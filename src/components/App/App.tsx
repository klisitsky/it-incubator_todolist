import React from 'react';
import './App.css';
import ButtonAppBar from "../AppBar/ButtonAppBar";
import TodolistsList from "../TodolistsList/TodolistsList";
import LinearProgress from "@mui/material/LinearProgress";
import {useAppSelector} from "./redux-store";
import {RequestStatusType} from "../../redux/Reducers/appReducer";
import {AppSnackbar} from "../SnackBar/SnackBar";

const App = React.memo(() => {

  const status = useAppSelector<RequestStatusType>(state => state.app.status)
  return (<>
      <ButtonAppBar/>
      {status === 'loading' && <LinearProgress/>}
      <TodolistsList/>
      <AppSnackbar/>
    </>
  )
})

export default App;
