import React, {useReducer} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import ButtonAppBar from "./components/AppBar/AppBar";
import Container from "@mui/material/Container";
import Grid from '@mui/material/Grid';
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from "./Reducers/tasksReducer";
import {
  addTodolistAC, changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC, todolistsReducer
} from "./Reducers/todolistsReducer";



export type FilterType = 'all' | 'active' | 'completed'


export type TodolistType = {
  id: string
  title: string
  filter: FilterType
}


export type AllTasksType = {
  [todolistId: string]: Array<TaskType>
}

function App() {

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, todolistsDispatch] = useReducer(todolistsReducer,[
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ])

  const changeFilter = (todolistId: string, newFilter:FilterType) => {
    todolistsDispatch(changeTodolistFilterAC(todolistId, newFilter))
  }

  const changeTodolistTitle = (todolistId:string, changedTodolistTitle: string) => {
    todolistsDispatch(changeTodolistTitleAC(todolistId, changedTodolistTitle))
  }

  const deleteTodolist = (todolistId: string) => {
    todolistsDispatch(deleteTodolistAC(todolistId))
    tasksDispatch(deleteTodolistAC(todolistId))
  }

  const addItemFormHandler = (newTitle:string) => {
    todolistsDispatch(addTodolistAC(newTitle))
    tasksDispatch(addTodolistAC(newTitle))
  }


  let [tasks, tasksDispatch] = useReducer(tasksReducer, {
    [todolistId1]:[
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "NodeJS", isDone: true }
    ],
    [todolistId2]:[
      { id: v1(), title: "Хлебушек", isDone: true },
      { id: v1(), title: "Молочко", isDone: true },
      { id: v1(), title: "Конфетки", isDone: false },
      { id: v1(), title: "Курочка", isDone: true }
    ]
  })

  const addTask = (todolistId: string, taskTitle:string) => {
    tasksDispatch(addTaskAC(todolistId, taskTitle))
   }

  const updateTask = (todolistId: string, taskId: string, taskTitle:string) => {
    tasksDispatch(updateTaskAC(todolistId, taskId, taskTitle))
  }

  const removeTask = (todolistId: string, taskId:string) => {
    tasksDispatch(removeTaskAC(todolistId, taskId))
  }

  const changeTaskStatus = (todolistId: string, taskId: string, newIsDone:boolean) => {
    tasksDispatch(changeTaskStatusAC(todolistId, taskId, newIsDone))
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
