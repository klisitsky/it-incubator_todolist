import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import ButtonAppBar from "./components/AppBar/AppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import {
  addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC, TodolistType
} from "./Reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux-store";



export type FilterType = 'all' | 'active' | 'completed'



function App() {

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)

  const changeFilter = (todolistId: string, newFilter:FilterType) => {
    dispatch(changeTodolistFilterAC(todolistId, newFilter))
  }

  const changeTodolistTitle = (todolistId:string, changedTodolistTitle: string) => {
    dispatch(changeTodolistTitleAC(todolistId, changedTodolistTitle))
  }

  const deleteTodolist = (todolistId: string) => {
    dispatch(deleteTodolistAC(todolistId))
  }

  const addItemFormHandler = (newTitle:string) => {
    dispatch(addTodolistAC(newTitle))
  }


  return (<>
      <ButtonAppBar/>
      <Container maxWidth={'xl'}>
        <div className="App">
          <Grid container style={{margin: "20px"}}>
            <AddItemForm addItem={addItemFormHandler} placeholder={'Новый список задач'}/>
          </Grid>
          <Grid container spacing={6}>
            {todolists.map(todo => {

              return <Grid key={todo.id} item xs={4}><Todolist
                todolistId={todo.id}
                newShapka={todo.title}
                todolistFilter={todo.filter}
                changeFilter={changeFilter}
                deleteTodolist={deleteTodolist}
                changeTodolistTitle={changeTodolistTitle}
              /></Grid>
            })}
          </Grid>
        </div>
      </Container>
    </>
  )
}

export default App;
