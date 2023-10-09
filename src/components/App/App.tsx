import React from 'react';
import './App.css';
import ButtonAppBar from "../AppBar/ButtonAppBar";
import TodolistsList from "../TodolistsList/TodolistsList";

const App = React.memo(() => {
  return (<>
      <ButtonAppBar/>
      <TodolistsList/>
    </>
  )
})

export default App;
