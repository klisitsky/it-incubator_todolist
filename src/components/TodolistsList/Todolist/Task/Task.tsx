import React from "react";
import s from "../Todolist.module.css";
import IconButton from "@mui/material/IconButton";
import DeleteIcon from "@mui/icons-material/Delete";
import Checkbox from "@mui/material/Checkbox";
import {EditableSpan} from "../../../EditableSpan/EditableSpan";
import {useTask} from "./hooks/useTask";
import {TaskStatuses} from "../../../../api/tasks-api";
import {TaskDomainType} from "../../../../redux/Reducers/tasksReducer";

type TaskPropsType = {
  task: TaskDomainType
  todolistId: string
}
export const Task: React.FC<TaskPropsType> = React.memo((props) => {

  const isLoading = props.task.loadingStatus === 'loading'
  const {
    onChangeChkBoxHandler,
    EditableSpanCallbackForTask,
    onClickHandler
  } = useTask(props.todolistId, props.task.id, props.task.status)

  return (
    <div className={s.taskItemBody}>
      <div className={props.task.status === TaskStatuses.Completed ? s.finishedTask : ''}>
        <Checkbox onChange={onChangeChkBoxHandler}
                  checked={!!props.task.status}
                  disabled={isLoading}/>
        <EditableSpan oldTitle={props.task.title}
                      callback={EditableSpanCallbackForTask}
                      disabled={isLoading}/>
      </div>
      <div>
        <IconButton onClick={onClickHandler} disabled={isLoading}><DeleteIcon/></IconButton>
      </div>
    </div>)
})