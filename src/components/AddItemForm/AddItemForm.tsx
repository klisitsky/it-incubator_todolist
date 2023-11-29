import React from 'react'
import s from './AddItemForm.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox'
import TextField from '@mui/material/TextField'
import IconButton from '@mui/material/IconButton'
import { useAddItemForm } from './hooks/useAddItemForm'

export type AddItemFormPropsType = {
  addItem: (title: string) => void
  disabled?: boolean
  placeholder?: string
  error?: string | undefined | null
}

export const AddItemForm: React.FC<AddItemFormPropsType> = React.memo((props) => {
  const { title, error, onChangeInputHandler, onKeyUpInputHandler, onClickBtnAddHandler } = useAddItemForm(
    props.addItem,
    props.error,
  )

  return (
    <div className={s.taskItemContainer}>
      <TextField
        value={title}
        onChange={onChangeInputHandler}
        onKeyUp={onKeyUpInputHandler}
        label={props.placeholder}
        error={!!error}
        helperText={error}
        size={'medium'}
        style={{ minWidth: '300px' }}
        disabled={props.disabled}
      />
      <IconButton
        onClick={onClickBtnAddHandler}
        disabled={props.disabled}>
        <AddBoxIcon
          style={{ cursor: 'pointer' }}
          fontSize={'large'}
          color={props.disabled ? 'disabled' : 'primary'}></AddBoxIcon>
      </IconButton>
    </div>
  )
})
