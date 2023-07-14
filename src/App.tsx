import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import ButtonAppBar from "./components/AppBar/AppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import {
  addTaskAC, AllTasksType, changeTaskStatusAC, removeTaskAC, updateTaskAC
} from "./Reducers/tasksReducer";
import {
  addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC, TodolistType
} from "./Reducers/todolistsReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux-store";



export type FilterType = 'all' | 'active' | 'completed'



function App() {

  const dispatch = useDispatch()
  const todolists = useSelector<AppRootStateType, Array<TodolistType>>(state => state.todolists)
  const tasks = useSelector<AppRootStateType, AllTasksType>(state => state.tasks)

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


  const addTask = (todolistId: string, taskTitle:string) => {
    dispatch(addTaskAC(todolistId, taskTitle))
   }

  const updateTask = (todolistId: string, taskId: string, taskTitle:string) => {
    dispatch(updateTaskAC(todolistId, taskId, taskTitle))
  }

  const removeTask = (todolistId: string, taskId:string) => {
    dispatch(removeTaskAC(todolistId, taskId))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, newIsDone:boolean) => {
    dispatch(changeTaskStatusAC(todolistId, taskId, newIsDone))
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

              let filteredTasks = tasks[todo.id]

              switch (todo.filter) {
                case 'active':
                  filteredTasks = tasks[todo.id].filter(task => !task.isDone)
                  break;
                case 'completed':
                  filteredTasks = tasks[todo.id].filter(task => task.isDone)
                  break;
              }

              return <Grid item xs={4}><Todolist
                key={todo.id}
                todolistId={todo.id}
                newShapka={todo.title}
                tasks={filteredTasks}
                removeTask={removeTask}
                addTask={addTask}
                callbackOnChangeChkBox={changeTaskStatus}
                filter={todo.filter}
                changeFilter={changeFilter}
                deleteTodolist={deleteTodolist}
                updateTask={updateTask}
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
