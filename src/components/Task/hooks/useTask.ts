import {useDispatch} from "react-redux";
import {changeTaskStatusAC, removeTaskAC, updateTaskAC} from "../../../redux/actions/tasksActions";

export const useTask = (todolistId: string,
                        taskId: string,
                        taskIsDone: boolean) => {

  const dispatch = useDispatch()

  const onClickHandler = () => {
    dispatch(removeTaskAC(todolistId, taskId))
  }

  const EditableSpanCallbackForTask = (newTitle: string) => {
    dispatch(updateTaskAC(todolistId, taskId, newTitle))
  }

  const onChangeChkBoxHandler = () => {
    dispatch(changeTaskStatusAC(todolistId, taskId, !taskIsDone))
  }


  return {
    onChangeChkBoxHandler,
    EditableSpanCallbackForTask,
    onClickHandler
  }
}