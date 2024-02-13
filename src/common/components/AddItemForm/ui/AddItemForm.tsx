import React from 'react'
import s from 'common/components/AddItemForm/ui/AddItemForm.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { useAddItemForm } from 'common/hooks'

type Props = {
  addItem: (title: string) => Promise<unknown>
  disabled?: boolean
  placeholder?: string
  currentError?: string | undefined | null
}

export const AddItemForm = React.memo(({ addItem, currentError, disabled, placeholder }: Props) => {
  const { title, newError, changeInputHandler, keyUpInputHandler, addItemHandler } = useAddItemForm(
    addItem,
    currentError,
  )

  return (
    <div className={s.taskItemContainer}>
      <TextField
        value={title}
        onChange={changeInputHandler}
        onKeyUp={keyUpInputHandler}
        label={placeholder}
        error={!!newError}
        helperText={newError}
        size={'medium'}
        style={{ minWidth: '300px' }}
        disabled={disabled}
      />
      <IconButton
        onClick={addItemHandler}
        disabled={disabled}>
        <AddBoxIcon
          style={{ cursor: 'pointer' }}
          fontSize={'large'}
          color={disabled ? 'disabled' : 'primary'}></AddBoxIcon>
      </IconButton>
    </div>
  )
})
