import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {FilterType} from "./App";
import s from './Todolist.module.css'

type TodolistPropsType = {
  newShapka?: string
  todolistId: string
  tasks: Array<TaskPropsType>
  removeTask: (todolistId: string, taskId:string)=>void
  addTask: (todolistId: string, taskTitle:string, setErr: (value: string | null) => void, setTtitle: (val: string) => void) => void
  callbackOnChangeChkBox: (todolistId: string, taskId: string, newIsDone:boolean) => void
  filter: FilterType
  changeFilter: (todolistId: string, newFilter:FilterType) => void
  deleteTodolist: (todolistId: string) => void
}

export type TaskPropsType = {
  id: string
  title: string
  isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {

  let [title, setTitle] = useState<string>('')
  let [error, setError] = useState<string|null>(null)


  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    setError(null)
    setTitle(event.currentTarget.value)
  }

  const onClickBtnAddHandler = () => props.addTask(props.todolistId, title, setError, setTitle)

  const onKeyUpInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.addTask(props.todolistId, title, setError, setTitle)
    }
  }

  const deleteTodolistHandler = () => props.deleteTodolist(props.todolistId)

  const filteringTasksBtnAllHandler = () => props.changeFilter(props.todolistId, 'all')
  const filteringTasksBtnActiveHandler = () => props.changeFilter(props.todolistId, 'active')
  const filteringTasksBtnCompletedHandler = () => props.changeFilter(props.todolistId, 'completed')

  const renderedTasks = props.tasks.map(task => {
    const onClickHandler = () => {props.removeTask(props.todolistId, task.id)}

    return (
      <li key={task.id} className={task.isDone ? s.finishedTask : ''}>
        <button onClick={onClickHandler}>X</button>
        <input type="checkbox" onChange={() => props.callbackOnChangeChkBox(props.todolistId, task.id, !task.isDone)} checked={task.isDone} />
        <span>{task.title}</span>
      </li>
    )
  })


  return (
      <div>
          <h3>{props.newShapka} <button onClick={deleteTodolistHandler}>Del todolist</button></h3>

          <div>
            <input className={error ? s.errorInput :''}
                   value={title}
                   onChange={onChangeInputHandler}
                   onKeyUp={onKeyUpInputHandler}
            />
            <button onClick={onClickBtnAddHandler}>+</button>
            {error && (<div className={s.errorMessage}>{error}</div>)}
          </div>
          <ul>
            {renderedTasks}
          </ul>
          <div>
            <button className={props.filter === 'all' ? s.activeFilter : ''}
                    onClick={filteringTasksBtnAllHandler}>All</button>
            <button className={props.filter === 'active' ? s.activeFilter : ''}
                    onClick={filteringTasksBtnActiveHandler}>Active</button>
            <button className={props.filter === 'completed' ? s.activeFilter : ''}
                    onClick={filteringTasksBtnCompletedHandler}>Completed</button>
          </div>
        </div>
  );
}