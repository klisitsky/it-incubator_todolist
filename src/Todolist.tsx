import React from "react";
import {FilterType} from "./App";
import s from './Todolist.module.css'
import {AddItemForm} from "./components/AddItemForm/AddItemForm";
import {EditableSpan} from "./components/EditableSpan/EditableSpan";

type TodolistPropsType = {
  newShapka: string
  todolistId: string
  tasks: Array<TaskType>
  removeTask: (todolistId: string, taskId:string)=>void
  addTask: (todolistId: string, taskTitle:string) => void
  callbackOnChangeChkBox: (todolistId: string, taskId: string, newIsDone:boolean) => void
  filter: FilterType
  changeFilter: (todolistId: string, newFilter:FilterType) => void
  deleteTodolist: (todolistId: string) => void
  updateTask: (todolistId: string, taskId: string, taskTitle:string) => void
  changeTodolistTitle: (todolistId:string, newTodolistTitle: string) => void
}

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}


export const Todolist = (props: TodolistPropsType) => {


  const deleteTodolistHandler = () => props.deleteTodolist(props.todolistId)

  const filteringTasksBtnAllHandler = () => props.changeFilter(props.todolistId, 'all')
  const filteringTasksBtnActiveHandler = () => props.changeFilter(props.todolistId, 'active')
  const filteringTasksBtnCompletedHandler = () => props.changeFilter(props.todolistId, 'completed')

  const renderedTasks = props.tasks.map(task => {
    const onClickHandler = () => {props.removeTask(props.todolistId, task.id)}

    const EditableSpanCallbackForTask = (newTitle: string) => {
      props.updateTask(props.todolistId, task.id, newTitle)
    }

    return (
      <li key={task.id} className={task.isDone ? s.finishedTask : ''}>
        <button onClick={onClickHandler}>X</button>
        <input type="checkbox" onChange={() => props.callbackOnChangeChkBox(props.todolistId, task.id, !task.isDone)} checked={task.isDone} />
        <EditableSpan oldTitle={task.title} callback={EditableSpanCallbackForTask} />
      </li>
    )
  })

  const callbackAddItemFormHandler = (title: string) => {
    props.addTask(props.todolistId, title)
  }

  const editableSpanCallbackForTodoTitle = (newTitle: string) => {
    props.changeTodolistTitle(props.todolistId, newTitle)
  }
  return (
      <div>
          <h3>
            <EditableSpan oldTitle={props.newShapka} callback={editableSpanCallbackForTodoTitle}/>
            <button onClick={deleteTodolistHandler}>Del todolist</button></h3>
        <AddItemForm callback={callbackAddItemFormHandler} placeholder={'Новая задача'}/>
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