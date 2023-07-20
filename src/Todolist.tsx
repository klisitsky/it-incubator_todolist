import React, {useCallback} from "react";
import {FilterType} from "./App";
import s from './Todolist.module.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import IconButton from '@mui/material/IconButton';
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {addTaskAC, TaskType} from "./Reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux-store";
import {Task} from "./components/Task/Task";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "./Reducers/todolistsReducer";

type TodolistPropsType = {
  todolistTitle: string
  todolistId: string
  todolistFilter: FilterType
}


export const Todolist = React.memo((props: TodolistPropsType) => {
  console.log('Todolist rendred: ' + props.todolistTitle)
  const dispatch = useDispatch()
  const tasks = useSelector<AppRootStateType, Array<TaskType>>(state => state.tasks[props.todolistId])
  let filteredTasks = tasks

  switch (props.todolistFilter) {
    case 'active':
      filteredTasks = tasks.filter(task => !task.isDone)
      break;
    case 'completed':
      filteredTasks = tasks.filter(task => task.isDone)
      break;
  }

  const changeTodolistTitle = (changedTodolistTitle: string) => {
    dispatch(changeTodolistTitleAC(props.todolistId, changedTodolistTitle))
  }

  const onDeleteTodolistClickHandler = useCallback(() => {
    dispatch(deleteTodolistAC(props.todolistId))
  }, [props.todolistId])


  const changeTodolistFilter = useCallback((newFilter: FilterType) => {
    dispatch(changeTodolistFilterAC(props.todolistId, newFilter))
  }, [props.todolistId])


  const addTask = useCallback((title: string) => {
    dispatch(addTaskAC(props.todolistId, title))
  }, [props.todolistId])


  const renderedTasks = filteredTasks.map(task => {
    return <Task key={task.id} task={task} todolistId={props.todolistId}/>
  })

  return (

    <div className={s.cardContainer}>
      <Paper elevation={3} style={{padding: '20px'}}>
      <h2>
        <EditableSpan oldTitle={props.todolistTitle} callback={changeTodolistTitle}/>
        <IconButton onClick={onDeleteTodolistClickHandler} >
          <DeleteIcon style={{cursor: 'pointer'}} fontSize={'large'}></DeleteIcon>
        </IconButton>
      </h2>
      <AddItemForm addItem={addTask} placeholder={'Новая задача'}/>
      <List disablePadding>
        {renderedTasks}
      </List>
      <div>
        <ButtonGroup>
          <Button variant={props.todolistFilter === 'all' ? 'contained' : 'outlined'}
                  onClick={() => changeTodolistFilter('all')}>All</Button>
          <Button variant={props.todolistFilter === 'active' ? 'contained' : 'outlined'}
                  onClick={() => changeTodolistFilter('active')}>Active</Button>
          <Button variant={props.todolistFilter === 'completed' ? 'contained' : 'outlined'}
                  onClick={() => changeTodolistFilter('completed')}>Completed</Button>
        </ButtonGroup>
      </div>
    </Paper></div>
  );
})

