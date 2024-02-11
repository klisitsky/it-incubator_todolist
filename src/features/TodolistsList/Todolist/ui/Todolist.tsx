import React, { useCallback } from 'react'
import s from 'features/TodolistsList/Todolist/ui/Todolist.module.css'
import Paper from '@mui/material/Paper'
import Grid from '@mui/material/Grid'
import { TodolistDomainType } from 'features/TodolistsList/Todolist/model/todolistsReducer'
import { AddItemForm } from 'common/components'
import TasksFilterButtons from 'features/TodolistsList/Todolist/TasksFilterButtons/ui/TasksFilterButtons'
import TodolistTitle from 'features/TodolistsList/Todolist/todolistTitle/todolistTitle'
import TasksList from '../TasksList/ui/TasksList'
import { tasksThunks } from 'features/TodolistsList/Todolist/Task/model/tasksReducer'
import { useActions } from 'common/hooks/useActions'

type Props = {
  todolist: TodolistDomainType
}

export const Todolist = React.memo(({ todolist }: Props) => {
  const isLoading = todolist.loadingStatus === 'loading'

  const { createTask } = useActions(tasksThunks)

  const addTaskCallback = useCallback(
    (title: string) => {
      return createTask({ todolistId: todolist.id, title }).unwrap()
    },
    [todolist.id],
  )

  return (
    <Grid
      key={todolist.id}
      item
      xs={4}>
      <div className={s.cardContainer}>
        <Paper
          elevation={3}
          style={{ padding: '20px' }}>
          <TodolistTitle
            todolist={todolist}
            isLoading={isLoading}
          />
          <AddItemForm
            addItem={addTaskCallback}
            placeholder={'Новая задача'}
            disabled={isLoading}
          />
          <TasksList todolist={todolist} />
          <div>
            <TasksFilterButtons
              todolist={todolist}
              isLoading={isLoading}
            />
          </div>
        </Paper>
      </div>
    </Grid>
  )
})
