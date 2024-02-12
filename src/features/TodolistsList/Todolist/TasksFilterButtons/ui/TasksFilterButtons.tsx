import React from 'react'
import Button from '@mui/material/Button'
import ButtonGroup from '@mui/material/ButtonGroup'
import { FilterType, TodolistDomainType, todolistsActions } from 'features/TodolistsList/Todolist/model/todolistsSlice'
import { useActions } from 'common/hooks/useActions'

type Props = {
  todolist: TodolistDomainType
  isLoading: boolean
}
export const TasksFilterButtons = ({ todolist, isLoading }: Props) => {
  const { changeTodolistFilter } = useActions(todolistsActions)
  const updateTodolistFilterHandler = (filter: FilterType) => {
    changeTodolistFilter({ todolistId: todolist.id, filter })
  }

  return (
    <ButtonGroup>
      <Button
        variant={todolist.filter === 'all' ? 'contained' : 'outlined'}
        onClick={() => updateTodolistFilterHandler('all')}
        disabled={isLoading}>
        All
      </Button>
      <Button
        variant={todolist.filter === 'active' ? 'contained' : 'outlined'}
        onClick={() => updateTodolistFilterHandler('active')}
        disabled={isLoading}>
        Active
      </Button>
      <Button
        variant={todolist.filter === 'completed' ? 'contained' : 'outlined'}
        onClick={() => updateTodolistFilterHandler('completed')}
        disabled={isLoading}>
        Completed
      </Button>
    </ButtonGroup>
  )
}

export default TasksFilterButtons
