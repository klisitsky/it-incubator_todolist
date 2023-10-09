import React from "react";
import s from './Todolist.module.css'
import {AddItemForm} from "../../AddItemForm/AddItemForm";
import {EditableSpan} from "../../EditableSpan/EditableSpan";
import DeleteIcon from '@mui/icons-material/Delete';
import IconButton from '@mui/material/IconButton';
import Paper from "@mui/material/Paper";
import ButtonGroup from "@mui/material/ButtonGroup";
import Button from "@mui/material/Button";
import {Task} from "./Task/Task";
import Grid from "@mui/material/Grid";
import {useTodolist} from "./hooks/useTodolist";
import {FilterType} from "../../../redux/Reducers/todolistsReducer";


type TodolistPropsType = {
  todolistTitle: string
  todolistId: string
  todolistFilter: FilterType
}


export const Todolist = React.memo((props: TodolistPropsType) => {

  const {
    filteredTasks,
    changeTodolistTitle,
    onDeleteTodolistClickHandler,
    addTask,
    changeTodolistFilter
  } = useTodolist(props.todolistId, props.todolistFilter)

  const renderedTasks = filteredTasks.map(task => {
    return <Task key={task.id} task={task} todolistId={props.todolistId}/>
  })

  return (
    <Grid key={props.todolistId} item xs={4}>
      <div className={s.cardContainer}>
        <Paper elevation={3} style={{padding: '20px'}}>
          <h2>
            <EditableSpan oldTitle={props.todolistTitle} callback={changeTodolistTitle}/>
            <IconButton onClick={onDeleteTodolistClickHandler}>
              <DeleteIcon style={{cursor: 'pointer'}} fontSize={'large'}></DeleteIcon>
            </IconButton>
          </h2>
          <AddItemForm addItem={addTask} placeholder={'Новая задача'}/>
          {renderedTasks}
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
        </Paper>
      </div>
    </Grid>
  );
})

