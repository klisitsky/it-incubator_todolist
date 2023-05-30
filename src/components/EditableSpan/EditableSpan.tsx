import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import TextField from "@mui/material/TextField";

type EditableSpanPropsType = {
  oldTitle: string
  callback: (newTitle: string) => void
}

export const EditableSpan: React.FC<EditableSpanPropsType> = (props) => {


  const [edit, setEdit] = useState<boolean>(true)
  const [newTitle, setNewTitle] = useState<string>(props.oldTitle)

  const EditHandler = () => {
    setEdit(!edit)
    props.callback(newTitle)
  }
  const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  const onKeyUpInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') EditHandler()
  }

  return (
    edit
      ? <span onDoubleClick={EditHandler}>{props.oldTitle}</span>
      : <TextField onBlur={EditHandler}
               value={newTitle}
               onChange={onChangeHandler}
               onKeyUp={onKeyUpInputHandler}
               autoFocus
               size={'small'}/>


  );
};
