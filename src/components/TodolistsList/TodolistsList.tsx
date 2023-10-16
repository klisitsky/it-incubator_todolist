import React, {useEffect} from 'react';
import Grid from "@mui/material/Grid";
import {AddItemForm} from "../AddItemForm/AddItemForm";
import {Todolist} from "./Todolist/Todolist";
import Container from "@mui/material/Container";
import {AppRootStateType, useAppDispatch} from "../App/redux-store";
import {useSelector} from "react-redux";
import {TodolistDomainType} from "../../redux/Reducers/todolistsReducer";
import {todolistsSelector} from "../../redux/selectors/selectors";
import {createTodolistTC, getTodolistsTC} from "../../redux/thunks/thunksTodolists";

const TodolistsList = () => {

  const dispatch = useAppDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistDomainType>>(todolistsSelector)

  useEffect(() => {
    dispatch(getTodolistsTC())
  }, [dispatch])

  const addTodolist = (newTitle: string) => {
    dispatch(createTodolistTC(newTitle))
  }

  return (<>
      <Container maxWidth={'xl'}>
        <div className="App">
          <Grid container style={{margin: "20px"}}>
            <AddItemForm addItem={addTodolist} placeholder={'Новый список задач'}/>
          </Grid>
          <Grid container spacing={6}>
            {todolists.map(todo => {
              return (
                <Todolist
                  key={todo.id}
                  todolistId={todo.id}
                  todolistTitle={todo.title}
                  todolistFilter={todo.filter}
                  todolistLoadingStatus={todo.loadingStatus}/>
              )
            })}
          </Grid>
        </div>
      </Container>
    </>
  );
};

export default TodolistsList;