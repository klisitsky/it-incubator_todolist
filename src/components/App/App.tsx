import React, {useEffect} from 'react';
import './App.css';
import {Todolist} from "../Todolist/Todolist";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import ButtonAppBar from "../AppBar/ButtonAppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import {useSelector} from "react-redux";
import { AppRootStateType, useAppDispatch} from "../../redux/redux-store";
import {addTodolistAC} from "../../redux/actions/todolistsActions";
import {todolistsSelector} from "../../redux/selectors/selectors";
import {TodolistDomainType} from "../../redux/Reducers/todolistsReducer"
import {getTodolistsTC} from "../../redux/thunks/thunksTodolists";

const App = React.memo(() => {

  const dispatch = useAppDispatch()

  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(todolistsSelector)

  useEffect(() => {
    dispatch(getTodolistsTC())
  }, [dispatch])


  const addTodolist = (newTitle: string) => {
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
              return (
                <Todolist
                  todolistId={todo.id}
                  todolistTitle={todo.title}
                  todolistFilter={todo.filter}/>
              )
            })}
          </Grid>
        </div>
      </Container>
    </>
  )
})

export default App;
