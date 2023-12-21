import React from 'react'
import s from 'features/TodolistsList/Todolist/Todolist.module.css'
import DeleteIcon from '@mui/icons-material/Delete'
import IconButton from '@mui/material/IconButton'
import Paper from '@mui/material/Paper'
import ButtonGroup from '@mui/material/ButtonGroup'
import Button from '@mui/material/Button'
import { Task } from 'features/TodolistsList/Todolist/Task/Task'
import Grid from '@mui/material/Grid'
import { useTodolist } from 'common/hooks'
import { FilterType } from 'features/TodolistsList/Todolist/todolistsReducer'
import { RequestStatusType } from 'features/App/appReducer'
import { AddItemForm, EditableSpan } from 'common/components'

type TodolistPropsType = {
  todolistTitle: string
  todolistId: string
  todolistFilter: FilterType
  todolistLoadingStatus: RequestStatusType
}

export const Todolist = React.memo((props: TodolistPropsType) => {
  const isLoading = props.todolistLoadingStatus === 'loading'
  const { filteredTasks, changeTodolistTitle, onDeleteTodolistClickHandler, addTask, changeTodolistFilter } =
    useTodolist(props.todolistId, props.todolistFilter)

  const renderedTasks = filteredTasks.map((task) => {
    return (
      <Task
        key={task.id}
        task={task}
        todolistId={props.todolistId}
      />
    )
  })

  return (
    <Grid
      key={props.todolistId}
      item
      xs={4}>
      <div className={s.cardContainer}>
        <Paper
          elevation={3}
          style={{ padding: '20px' }}>
          <h2>
            <EditableSpan
              oldTitle={props.todolistTitle}
              callback={changeTodolistTitle}
              disabled={isLoading}
            />
            <IconButton
              onClick={onDeleteTodolistClickHandler}
              disabled={isLoading}>
              <DeleteIcon
                style={{ cursor: 'pointer' }}
                fontSize={'large'}></DeleteIcon>
            </IconButton>
          </h2>
          <AddItemForm
            addItem={addTask}
            placeholder={'Новая задача'}
            disabled={isLoading}
          />
          {renderedTasks}
          <div>
            <ButtonGroup>
              <Button
                variant={props.todolistFilter === 'all' ? 'contained' : 'outlined'}
                onClick={() => changeTodolistFilter('all')}
                disabled={isLoading}>
                All
              </Button>
              <Button
                variant={props.todolistFilter === 'active' ? 'contained' : 'outlined'}
                onClick={() => changeTodolistFilter('active')}
                disabled={isLoading}>
                Active
              </Button>
              <Button
                variant={props.todolistFilter === 'completed' ? 'contained' : 'outlined'}
                onClick={() => changeTodolistFilter('completed')}
                disabled={isLoading}>
                Completed
              </Button>
            </ButtonGroup>
          </div>
        </Paper>
      </div>
    </Grid>
  )
})
