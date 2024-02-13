import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'

export const useEditableSpan = (
  oldTitle: string,
  onNewTitleSetted: (newTitle: string) => void,
  editValue: boolean | undefined,
) => {
  const [edit, setEdit] = useState<boolean | undefined>(editValue)
  const [newTitle, setNewTitle] = useState<string>(oldTitle)

  const editOffHandler = useCallback(() => {
    setEdit(false)
    onNewTitleSetted(newTitle)
  }, [onNewTitleSetted, newTitle])

  const EditOnHandler = () => {
    setEdit(true)
  }

  const setTitleHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setNewTitle(event.currentTarget.value)
  }

  const keyUpInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') editOffHandler()
  }
  return {
    edit,
    EditOnHandler,
    editOffHandler,
    oldTitle,
    newTitle,
    setTitleHandler,
    keyUpInputHandler,
  }
}
