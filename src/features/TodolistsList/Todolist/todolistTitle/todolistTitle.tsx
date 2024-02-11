import React, { useCallback } from 'react'
import { EditableSpan } from 'common/components'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import { TodolistDomainType, todolistsThunks } from 'features/TodolistsList/Todolist/model/todolistsReducer'
import { useActions } from 'common/hooks/useActions'

type Props = {
  todolist: TodolistDomainType
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

  const onDeleteTodolistClickHandler = useCallback(() => {
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
        onClick={onDeleteTodolistClickHandler}
        disabled={isLoading}>
        <DeleteIcon
          style={{ cursor: 'pointer' }}
          fontSize={'large'}></DeleteIcon>
      </IconButton>
    </h2>
  )
}

export default TodolistTitle
