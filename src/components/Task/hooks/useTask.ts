import {changeTaskStatusAC, updateTaskAC} from "../../../redux/actions/tasksActions";
import {TaskStatuses} from "../../../api/tasks-api";
import {deleteTaskTC} from "../../../redux/thunks/thunksTasks";
import {useAppDispatch} from "../../../redux/redux-store";

export const useTask = (todolistId: string,
                        taskId: string,
                        taskStatus: TaskStatuses) => {

  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(deleteTaskTC(todolistId, taskId))
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