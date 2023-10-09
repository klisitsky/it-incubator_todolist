import React from "react";
import s from "../Todolist.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import {useTask} from "./hooks/useTask";
import {TaskStatuses, TaskType} from "../../../../api/tasks-api";

type TaskPropsType = {
  task: TaskType
  todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {

  const {
    onChangeChkBoxHandler,
    EditableSpanCallbackForTask,
    onClickHandler
  } = useTask(props.todolistId, props.task.id, props.task.status)

  console.log(props.task.status)

  return (
    <div className={s.taskItemBody}>
      <div className={props.task.status === TaskStatuses.Completed ? s.finishedTask : ''}>
        <Checkbox onChange={onChangeChkBoxHandler}
                  checked={!!props.task.status}/>
        <EditableSpan oldTitle={props.task.title} callback={EditableSpanCallbackForTask}/>
      </div>
      <div>
        <IconButton onClick={onClickHandler}><DeleteIcon/></IconButton>
      </div>
    </div>)
})