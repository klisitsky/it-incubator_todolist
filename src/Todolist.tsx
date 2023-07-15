import React from "react";
import {FilterType} from "./App";
import s from './Todolist.module.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import IconButton from '@mui/material/IconButton';
import Checkbox from '@mui/material/Checkbox';
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {
  addTaskAC,
  changeTaskStatusAC, removeTaskAC,
  TaskType, updateTaskAC
} from "./Reducers/tasksReducer";
import {useDispatch, useSelector} from "react-redux";
import {AppRootStateType} from "./redux/redux-store";

type TodolistPropsType = {
  newShapka: string
  todolistId: string
  todolistFilter: FilterType
  changeFilter: (todolistId: string, newFilter:FilterType) => void
  deleteTodolist: (todolistId: string) => void
  changeTodolistTitle: (todolistId:string, newTodolistTitle: string) => void
}


export const Todolist = (props: TodolistPropsType) => {

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


  const deleteTodolistHandler = () => props.deleteTodolist(props.todolistId)

  const filteringTasksBtnHandler = (todolistId: string, newFilter:FilterType) => {
    props.changeFilter(todolistId, newFilter)
  }
  const callbackAddItemFormHandler = (title: string) => {
    dispatch(addTaskAC(props.todolistId, title))
  }
  const editableSpanCallbackForTodoTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.todolistId, newTitle)
  }

  const renderedTasks = filteredTasks.map(task => {

    const onClickHandler = () => {dispatch(removeTaskAC(props.todolistId, task.id))}
    const EditableSpanCallbackForTask = (newTitle: string) => {
      dispatch(updateTaskAC(props.todolistId, task.id, newTitle))
    }
    const onChangeChkBoxHandler = () => {
      dispatch(changeTaskStatusAC(props.todolistId, task.id, !task.isDone))
    }

    return (
      <ListItem key={task.id}
                className={s.task + (task.isDone ? ' '+ s.finishedTask : '')}
                secondaryAction={
                  <IconButton onClick={onClickHandler}>
                    <DeleteIcon>X</DeleteIcon>
                  </IconButton>
                }>
        <Checkbox onChange={onChangeChkBoxHandler}
                  defaultChecked={task.isDone}/>
        <EditableSpan oldTitle={task.title} callback={EditableSpanCallbackForTask} />

      </ListItem>
    )
  })


  return (

    <div className={s.cardContainer}>
      <Paper elevation={3} style={{padding: '20px'}}>
      <h2>
        <EditableSpan oldTitle={props.newShapka} callback={editableSpanCallbackForTodoTitle}/>
        <IconButton onClick={deleteTodolistHandler} >
          <DeleteIcon style={{cursor: 'pointer'}} fontSize={'large'}></DeleteIcon>
        </IconButton>
      </h2>
      <AddItemForm addItem={callbackAddItemFormHandler} placeholder={'Новая задача'}/>
      <List disablePadding>
        {renderedTasks}
      </List>
      <div>
        <ButtonGroup>
          <Button variant={props.todolistFilter === 'all' ? 'contained' : 'outlined'}
                  onClick={() => filteringTasksBtnHandler(props.todolistId, 'all')}>All</Button>
          <Button variant={props.todolistFilter === 'active' ? 'contained' : 'outlined'}
                  onClick={() => filteringTasksBtnHandler(props.todolistId, 'active')}>Active</Button>
          <Button variant={props.todolistFilter === 'completed' ? 'contained' : 'outlined'}
                  onClick={() => filteringTasksBtnHandler(props.todolistId, 'completed')}>Completed</Button>
        </ButtonGroup>
      </div>
    </Paper></div>
  );
}