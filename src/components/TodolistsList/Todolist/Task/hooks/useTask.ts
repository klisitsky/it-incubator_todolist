import { TaskStatuses } from 'api/tasks-api'
import { useAppDispatch } from 'components/App/redux-store'
import { deleteTaskTC, updateTaskTC } from 'redux/Reducers/tasksReducer'

export const useTask = (todolistId: string, taskId: string, taskStatus: TaskStatuses) => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(deleteTaskTC(todolistId, taskId))
  }

  const EditableSpanCallbackForTask = (newTitle: string) => {
    dispatch(updateTaskTC(todolistId, taskId, { title: newTitle }))
  }

  const onChangeChkBoxHandler = () => {
    const newTaskStatus = taskStatus === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(updateTaskTC(todolistId, taskId, { status: newTaskStatus }))
  }

  return {
    onChangeChkBoxHandler,
    EditableSpanCallbackForTask,
    onClickHandler,
  }
}
