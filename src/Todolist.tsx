import React, {ChangeEvent, KeyboardEvent, useState} from "react";
import {BtnNameType} from "./App";
import s from './Todolist.module.css'

type TodolistPropsType = {
  shapka?: string
  newShapka?: string
  tasks: Array<TasksPropsType>
  removeTask: (id:string)=>void
  addTask: (title:string) => void
  title: string
  setTitle: (title:string) => void
  error: string | null
  setError: (value: string | null) => void
  callbackOnChangeChkBox: (id:string, isDone:boolean) => void
}

export type TasksPropsType = {
  id: string
  title: string
  isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {

  let [filter, setFilter] = useState<BtnNameType>('all')
  let filteredTasks = props.tasks

  switch (filter) {
    case 'active':
      filteredTasks = props.tasks.filter(task => !task.isDone)
      break;
    case 'completed':
      filteredTasks = props.tasks.filter(task => task.isDone)
      break;
  }

  const filteringTasks = (btnName:BtnNameType) => {
    setFilter(btnName)
  }

  const onChangeInputHandler = (event: ChangeEvent<HTMLInputElement>) => {
    props.setError(null)
    props.setTitle(event.currentTarget.value)
  }

  const onClickBtnAddHandler = () => props.addTask(props.title)

  const onKeyUpInputHandler = (event:KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Enter') {
      props.addTask(props.title)
    }
  }



  const filteringTasksBtnAllHandler = () => filteringTasks('all')
  const filteringTasksBtnActiveHandler = () => filteringTasks('active')
  const filteringTasksBtnCompletedHandler = () => filteringTasks('completed')

  const renderedTasks = filteredTasks.map(task => {

    const onClickHandler = () => {props.removeTask(task.id)}

    return (
      <li key={task.id} className={task.isDone ? s.finishedTask : ''}>
        <button onClick={onClickHandler}>X</button>
        <input type="checkbox" onChange={() => props.callbackOnChangeChkBox(task.id, !task.isDone)} checked={task.isDone} />
        <span>{task.title}</span>
      </li>
    )
  })


  return (
      <div>
          <h3>{props.shapka}</h3>
          <h3>{props.newShapka}</h3>
          <div>
            <input className={props.error ? s.errorInput :''}
                   value={props.title}
                   onChange={onChangeInputHandler}
                   onKeyUp={onKeyUpInputHandler}
            />
            <button onClick={onClickBtnAddHandler}>+</button>
            {props.error && (<div className={s.errorMessage}>{props.error}</div>)}
          </div>
          <ul>
            {renderedTasks}
          </ul>
          <div>
            <button className={filter === 'all' ? s.activeFilter : ''}
                    onClick={filteringTasksBtnAllHandler}>All</button>
            <button className={filter === 'active' ? s.activeFilter : ''}
                    onClick={filteringTasksBtnActiveHandler}>Active</button>
            <button className={filter === 'completed' ? s.activeFilter : ''}
                    onClick={filteringTasksBtnCompletedHandler}>Completed</button>
          </div>
        </div>
  );
}