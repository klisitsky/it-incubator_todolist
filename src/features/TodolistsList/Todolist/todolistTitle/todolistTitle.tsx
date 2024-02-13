import React, { useCallback } from 'react'
import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { TodolistDomain, todolistsThunks } from 'features/TodolistsList/Todolist/model/todolistsSlice'
import { useActions } from 'common/hooks/useActions'

type Props = {
  todolist: TodolistDomain
  isLoading: boolean
}
const TodolistTitle = ({ todolist, isLoading }: Props) => {
  const { updateTodolistTitle, deleteTodolist } = useActions(todolistsThunks)

  const updateTodolistTitleHandler = useCallback(
    (title: string) => {
      updateTodolistTitle({ todolistId: todolist.id, title })
    },
    [todolist.id],
  )

  const deleteTodolistClickHandler = useCallback(() => {
    deleteTodolist(todolist.id)
  }, [todolist.id])

  return (
    <h2>
      <EditableSpan
        oldTitle={todolist.title}
        callback={updateTodolistTitleHandler}
        disabled={isLoading}
      />
      <IconButton
        onClick={deleteTodolistClickHandler}
        disabled={isLoading}>
        <DeleteIcon
          style={{ cursor: 'pointer' }}
          fontSize={'large'}></DeleteIcon>
      </IconButton>
    </h2>
  )
}

export default TodolistTitle
