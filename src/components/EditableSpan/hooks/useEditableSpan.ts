import {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";

export const useEditableSpan = (oldTitle: string,
                                onNewTitleSetted: (newTitle: string) => void,
                                editValue: boolean | undefined
) => {
  const [edit, setEdit] = useState<boolean | undefined>(editValue)
  const [newTitle, setNewTitle] = useState<string>(oldTitle)

  const EditOffHandler = useCallback(() => {
    setEdit(false)
    onNewTitleSetted(newTitle)
  }, [onNewTitleSetted, newTitle])

  const EditOnHandler = () => {
    setEdit(true)
  }

  const onChangeHandler = (event:ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  const onKeyUpInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') EditOffHandler()
  }
  return {
    edit,
    EditOnHandler,
    EditOffHandler,
    oldTitle,
    newTitle,
    onChangeHandler,
    onKeyUpInputHandler}
}