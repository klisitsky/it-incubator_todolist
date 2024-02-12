import React from 'react'
import s from 'features/TodolistsList/Todolist/ui/Todolist.module.css'
import IconButton from '@mui/material/IconButton'
import DeleteIcon from '@mui/icons-material/Delete'
import Checkbox from '@mui/material/Checkbox'
import { useTask } from 'features/TodolistsList/Todolist/Task/lib/useTask'
import { TaskStatuses } from 'features/TodolistsList/Todolist/Task/api/tasksApi'
import { TaskDomain } from 'features/TodolistsList/Todolist/Task/model/tasksSlice'
import { EditableSpan } from 'common/components'

type Props = {
  task: TaskDomain
  todolistId: string
}
export const Task = React.memo(({ todolistId, task }: Props) => {
  const isLoading = task.loadingStatus === 'loading'
  const { updateTaskStatusHandler, updateTaskTitleHandler, deleteTaskHandler } = useTask(
    todolistId,
    task.id,
    task.status,
  )

  return (
    <div className={s.taskItemBody}>
      <div className={task.status === TaskStatuses.Completed ? s.finishedTask : ''}>
        <Checkbox
          onChange={updateTaskStatusHandler}
          checked={!!task.status}
          disabled={isLoading}
        />
        <EditableSpan
          oldTitle={task.title}
          callback={updateTaskTitleHandler}
          disabled={isLoading}
        />
      </div>
      <div>
        <IconButton
          onClick={deleteTaskHandler}
          disabled={isLoading}>
          <DeleteIcon />
        </IconButton>
      </div>
    </div>
  )
})
