import { ChangeEvent, KeyboardEvent, useCallback, useState } from 'react'

export const useAddItemForm = (
  onItemAdded: (title: string) => Promise<unknown>,
  errorDefault: string | undefined | null,
) => {
  let [title, setTitle] = useState<string>('')
  let [newError, setNewError] = useState<string | undefined | null>(errorDefault)

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    if (!newError) setNewError(null)
    setTitle(event.currentTarget.value)
  }

  const onClickBtnAddHandler = useCallback(() => {
    title = title.trim()
    if (title) {
      onItemAdded(title)
        .then(() => {
          setNewError(null)
          setTitle('')
        })
        .catch((err) => {
          setNewError(err?.messages[0])
        })
    }
  }, [onItemAdded, title, newError])

  const onKeyUpInputHandler = (event: KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      onClickBtnAddHandler()
    }
  }

  return {
    title,
    newError,
    onChangeInputHandler,
    onKeyUpInputHandler,
    onClickBtnAddHandler,
  }
}
