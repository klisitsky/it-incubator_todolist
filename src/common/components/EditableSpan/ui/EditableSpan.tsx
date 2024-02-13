import React from 'react'
import TextField from '@mui/material/TextField'
import { useEditableSpan } from 'common/hooks'
import s from 'common/components/EditableSpan/ui/EditableSpan.module.css'

export type Props = {
  oldTitle: string
  callback: (newTitle: string) => void
  edit?: boolean
  disabled?: boolean
}

export const EditableSpan = React.memo((props: Props) => {
  const { edit, EditOnHandler, editOffHandler, newTitle, setTitleHandler, keyUpInputHandler } = useEditableSpan(
    props.oldTitle,
    props.callback,
    props.edit,
  )

  return !edit ? (
    <span
      onDoubleClick={EditOnHandler}
      className={props.disabled ? s.disabledSpan : ''}>
      {props.oldTitle}
    </span>
  ) : (
    <TextField
      onBlur={editOffHandler}
      value={newTitle}
      onChange={setTitleHandler}
      onKeyUp={keyUpInputHandler}
      autoFocus
      size={'small'}
      disabled={props.disabled}
    />
  )
})
