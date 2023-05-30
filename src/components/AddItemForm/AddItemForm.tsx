import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './AddItemForm.module.css'
import AddBoxIcon from '@mui/icons-material/AddBox';
import TextField from '@mui/material/TextField';
import IconButton from "@mui/material/IconButton";

type AddItemFormPropsType = {
  addItem: (title: string) => void
  placeholder?: string
}

export const AddItemForm: React.FC<AddItemFormPropsType> = (props) => {


  let [title, setTitle] = useState<string>('')
  let [error, setError] = useState<string|null>(null)

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(event.currentTarget.value)
  }

  const onClickBtnAddHandler = () => {
    title = title.trim()
    if (title) {
      props.addItem(title)
      setError(null)
    } else {
      setError('Заполните поле')
    }
    setTitle('')
  }

  const onKeyUpInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickBtnAddHandler();
    }
  }

  return (
    <div className={s.taskItemContainer}>
    <TextField value={title}
               onChange={onChangeInputHandler}
               onKeyUp={onKeyUpInputHandler}
               label={props.placeholder}
               error={!!error}
               helperText={error}
               size={'medium'}
               style={{minWidth: '300px'}}

    />
    <IconButton>
        <AddBoxIcon onClick={onClickBtnAddHandler} style={{cursor: 'pointer'}} fontSize={'large'} color={'primary'}></AddBoxIcon>
    </IconButton>
  </div>
  );
};
