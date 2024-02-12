import { TaskStatuses } from 'features/TodolistsList/Todolist/Task/api/tasksApi'
import { tasksThunks } from 'features/TodolistsList/Todolist/Task/model/tasksSlice'
import { useActions } from 'common/hooks/useActions'

export const useTask = (todolistId: string, taskId: string, taskStatus: TaskStatuses) => {
  const { deleteTask, updateTask } = useActions(tasksThunks)

  const deleteTaskHandler = () => {
    deleteTask({ todolistId, taskId })
  }

  const updateTaskTitleHandler = (title: string) => {
    updateTask({ todolistId, taskId, taskModel: { title } })
  }

  const updateTaskStatusHandler = () => {
    const status = taskStatus === TaskStatuses.New ? TaskStatuses.Completed : TaskStatuses.New
    updateTask({ todolistId, taskId, taskModel: { status } })
  }

  return {
    updateTaskStatusHandler,
    updateTaskTitleHandler,
    deleteTaskHandler,
  }
}
