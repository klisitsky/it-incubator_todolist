import React from "react";
import {TaskType} from "../../redux/Reducers/tasksReducer";
import s from "../Todolist/Todolist.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../EditableSpan/EditableSpan";
import {useTask} from "./hooks/useTask";

type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {

  const {
    onChangeChkBoxHandler,
    EditableSpanCallbackForTask,
    onClickHandler
  } = useTask(props.todolistId, props.task.id, props.task.isDone)


  return (
    <div className={s.taskItemBody}>
      <div className={props.task.isDone ? s.finishedTask : ''}>
        <Checkbox onChange={onChangeChkBoxHandler}
                  defaultChecked={props.task.isDone}/>
        <EditableSpan oldTitle={props.task.title} callback={EditableSpanCallbackForTask}/>
      </div>
      <div>
        <IconButton onClick={onClickHandler}><DeleteIcon/></IconButton>
      </div>
    </div>)
})