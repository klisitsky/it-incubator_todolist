import React from 'react';
import TextField from "@mui/material/TextField";
import {useEditableSpan} from "./hooks/useEditableSpan";

export type EditableSpanPropsType = {
  oldTitle: string
  callback: (newTitle: string) => void
  edit?: boolean
}

export const EditableSpan: React.FC<EditableSpanPropsType> = React.memo((props) => {

  const {
    edit,
    EditOnHandler,
    EditOffHandler,
    newTitle,
    oldTitle,
    onChangeHandler,
    onKeyUpInputHandler
  } = useEditableSpan(props.oldTitle, props.callback, props.edit)

  return (
    !edit
      ? <span onDoubleClick={EditOnHandler}>{oldTitle}</span>
      : <TextField onBlur={EditOffHandler}
               value={newTitle}
               onChange={onChangeHandler}
               onKeyUp={onKeyUpInputHandler}
               autoFocus
               size={'small'}/>
  );
})
