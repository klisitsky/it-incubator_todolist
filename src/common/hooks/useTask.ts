import { TaskStatuses } from 'features/TodolistsList/Todolist/Task/tasksApi'
import { tasksThunks } from 'features/TodolistsList/Todolist/Task/tasksReducer'
import { useAppDispatch } from 'common/hooks'

export const useTask = (todolistId: string, taskId: string, taskStatus: TaskStatuses) => {
  const dispatch = useAppDispatch()

  const onClickHandler = () => {
    dispatch(tasksThunks.deleteTask({ todolistId, taskId }))
  }

  const EditableSpanCallbackForTask = (title: string) => {
    dispatch(tasksThunks.updateTask({ todolistId, taskId, taskModel: { title } }))
  }

  const onChangeChkBoxHandler = () => {
    const status = taskStatus === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New
    dispatch(tasksThunks.updateTask({ todolistId, taskId, taskModel: { status } }))
  }

  return {
    onChangeChkBoxHandler,
    EditableSpanCallbackForTask,
    onClickHandler,
  }
}
