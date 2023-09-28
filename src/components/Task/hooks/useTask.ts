import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskAC} from "../../../redux/actions/tasksActions";
import {TaskStatuses} from "../../../api/tasks-api";

export const useTask = (todolistId: string,
                        taskId: string,
                        taskStatus: TaskStatuses) => {

  const dispatch = useDispatch()

  const onClickHandler = () => {
    dispatch(removeTaskAC(todolistId, taskId))
  }

  const EditableSpanCallbackForTask = (newTitle: string) => {
    dispatch(updateTaskAC(todolistId, taskId, newTitle))
  }

  const onChangeChkBoxHandler = () => {
    const newTaskStatus = taskStatus === TaskStatuses.New
      ? TaskStatuses.Completed
      : TaskStatuses.New
    dispatch(changeTaskStatusAC(todolistId, taskId, newTaskStatus))
  }

  return {
    onChangeChkBoxHandler,
    EditableSpanCallbackForTask,
    onClickHandler
  }
}