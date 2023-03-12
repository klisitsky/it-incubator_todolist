import React, {ChangeEvent, KeyboardEvent, useState} from 'react';
import s from './AddItemForm.module.css'


type AddItemFormPropsType = {
  callback: (title: string) => void
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
      props.callback(title)
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
    <div>
    <input className={error ? s.errorInput :''}
           value={title}
           onChange={onChangeInputHandler}
           onKeyUp={onKeyUpInputHandler}
           placeholder={props.placeholder}
    />
    <button onClick={onClickBtnAddHandler}>+</button>
    {error && (<div className={s.errorMessage}>{error}</div>)}
  </div>
  );
};
