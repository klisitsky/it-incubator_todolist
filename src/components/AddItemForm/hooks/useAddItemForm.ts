import {ChangeEvent, KeyboardEvent, useCallback, useState} from "react";


export const useAddItemForm  = (onItemAdded: (title: string) => void,
                                errorDefault: string | undefined | null
) => {

  let [title, setTitle] = useState<string>('')
  let [error, setError] = useState<string | undefined | null>(errorDefault)

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!error) setError(null)
    setTitle(event.currentTarget.value)
  }

  const onClickBtnAddHandler = useCallback(() => {
    title = title.trim()
    if (title) {
      onItemAdded(title)
      setError(null)
    } else {
      setError('Заполните поле')
    }
    setTitle('')
  }, [onItemAdded, title, error])

  const onKeyUpInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickBtnAddHandler();
    }
  }

  return {
    title,
    error,
    onChangeInputHandler,
    onKeyUpInputHandler,
    onClickBtnAddHandler
  }
}

