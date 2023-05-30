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

type TodolistPropsType = {
  newShapka: string
  todolistId: string
  tasks: Array<TaskType>
  removeTask: (todolistId: string, taskId:string)=>void
  addTask: (todolistId: string, taskTitle:string) => void
  callbackOnChangeChkBox: (todolistId: string, taskId: string, newIsDone:boolean) => void
  filter: FilterType
  changeFilter: (todolistId: string, newFilter:FilterType) => void
  deleteTodolist: (todolistId: string) => void
  updateTask: (todolistId: string, taskId: string, taskTitle:string) => void
  changeTodolistTitle: (todolistId:string, newTodolistTitle: string) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {


  const deleteTodolistHandler = () => props.deleteTodolist(props.todolistId)

  const filteringTasksBtnAllHandler = () => props.changeFilter(props.todolistId, 'all')
  const filteringTasksBtnActiveHandler = () => props.changeFilter(props.todolistId, 'active')
  const filteringTasksBtnCompletedHandler = () => props.changeFilter(props.todolistId, 'completed')

  const renderedTasks2 = props.tasks.map(task => {

    const onClickHandler = () => {props.removeTask(props.todolistId, task.id)}
    const EditableSpanCallbackForTask = (newTitle: string) => {
      props.updateTask(props.todolistId, task.id, newTitle)
    }
    const onChangeChkBoxHandler = () => {
      props.callbackOnChangeChkBox(props.todolistId, task.id, !task.isDone)
    }

    return (
      <ListItem key={task.id}
                className={s.task + (task.isDone ? ' '+ s.finishedTask : '')}
                secondaryAction={
                  <IconButton>
                    <DeleteIcon onClick={onClickHandler}>X</DeleteIcon>
                  </IconButton>
                }>
        <Checkbox onChange={onChangeChkBoxHandler}
                  defaultChecked={task.isDone}/>
        <EditableSpan oldTitle={task.title} callback={EditableSpanCallbackForTask} />

      </ListItem>
    )
  })

  const callbackAddItemFormHandler = (title: string) => {
    props.addTask(props.todolistId, title)
  }

  const editableSpanCallbackForTodoTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.todolistId, newTitle)
  }

  return (

    <div className={s.cardContainer}>
      <Paper elevation={3} style={{padding: '20px'}}>
      <h2>
        <EditableSpan oldTitle={props.newShapka} callback={editableSpanCallbackForTodoTitle}/>
        <IconButton>
          <DeleteIcon onClick={deleteTodolistHandler} style={{cursor: 'pointer'}} fontSize={'large'}></DeleteIcon>
        </IconButton>
      </h2>
      <AddItemForm addItem={callbackAddItemFormHandler} placeholder={'Новая задача'}/>
      <List disablePadding>
        {renderedTasks2}
      </List>
      <div>
        <ButtonGroup>
          <Button variant={props.filter === 'all' ? 'contained' : 'outlined'}
                  onClick={filteringTasksBtnAllHandler}>All</Button>
          <Button variant={props.filter === 'active' ? 'contained' : 'outlined'}
                  onClick={filteringTasksBtnActiveHandler}>Active</Button>
          <Button variant={props.filter === 'completed' ? 'contained' : 'outlined'}
                  onClick={filteringTasksBtnCompletedHandler}>Completed</Button>
        </ButtonGroup>
      </div>
    </Paper></div>
  );
}