import React from "react";
import {useDispatch} from "react-redux";
import {TaskType} from "../../redux/Reducers/tasksReducer";
import s from "../Todolist/Todolist.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {changeTaskStatusAC, removeTaskAC, updateTaskAC} from "../../redux/actions/tasksActions";

type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {
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

  return (
    <div className={s.taskItemBody}>
      <div>
        <Checkbox onChange={onChangeChkBoxHandler}
                  defaultChecked={props.task.isDone}/>
        <EditableSpan oldTitle={props.task.title} callback={EditableSpanCallbackForTask}/>
      </div>
      <div>
        <IconButton onClick={onClickHandler}><DeleteIcon/></IconButton>
      </div>
    </div>)
})