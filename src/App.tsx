import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import ButtonAppBar from "./components/AppBar/AppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import {
  addTodolistAC, TodolistType
} from "./Reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux-store";

export type FilterType = 'all' | 'active' | 'completed'

const App = React.memo(() => {
  console.log('App rendred')
  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

  const addTodolist = (newTitle:string) => {
    dispatch(addTodolistAC(newTitle))
  }

  return (<>
      <ButtonAppBar/>
      <Container maxWidth={'xl'}>
        <div className="App">
          <Grid container style={{margin: "20px"}}>
            <AddItemForm addItem={addTodolist} placeholder={'Новый список задач'}/>
          </Grid>
          <Grid container spacing={6}>
            {todolists.map(todo => {
              return <Grid key={todo.id} item xs={4}>
                <Todolist
                todolistId={todo.id}
                todolistTitle={todo.title}
                todolistFilter={todo.filter}
              /></Grid>
            })}
          </Grid>
        </div>
      </Container>
    </>
  )
})

export default App;
