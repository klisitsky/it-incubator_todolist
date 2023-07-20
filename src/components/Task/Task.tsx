import React from "react";
import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, TaskType, updateTaskAC} from "../../Reducers/tasksReducer";
import ListItem from "@mui/material/ListItem";
import s from "../../Todolist.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";

type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
  console.log('Task rendered')
  const dispatch = useDispatch()

  const onClickHandler = () => {
    dispatch(removeTaskAC(props.todolistId, props.task.id))
  }

  const EditableSpanCallbackForTask = (newTitle: string) => {
    dispatch(updateTaskAC(props.todolistId, props.task.id, newTitle))
  }

  const onChangeChkBoxHandler = () => {
    dispatch(changeTaskStatusAC(props.todolistId, props.task.id, !props.task.isDone))
  }

  return (<ListItem key={props.task.id}
                    className={s.task + (props.task.isDone ? ' ' + s.finishedTask : '')}
                    secondaryAction={<IconButton onClick={onClickHandler}>
                      <DeleteIcon>X</DeleteIcon>
                    </IconButton>}>
      <Checkbox onChange={onChangeChkBoxHandler}
                defaultChecked={props.task.isDone}/>
      <EditableSpan oldTitle={props.task.title} callback={EditableSpanCallbackForTask}/>

    </ListItem>)
})