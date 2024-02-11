import React, { useEffect } from 'react'
import { Task } from 'features/TodolistsList/Todolist/Task/ui/Task'
import { useSelector } from 'react-redux'
import { AppRootStateType } from 'features/App/store'
import { TaskDomain, tasksThunks } from 'features/TodolistsList/Todolist/Task/model/tasksReducer'
import { TaskStatuses } from 'features/TodolistsList/Todolist/Task/api/tasksApi'
import { tasksSelector } from 'common/selectors/selectors'
import { TodolistDomainType } from 'features/TodolistsList/Todolist/model/todolistsReducer'
import { useActions } from 'common/hooks/useActions'

type Props = {
  todolist: TodolistDomainType
}

export const TasksList = ({ todolist }: Props) => {
  const { fetchTasks } = useActions(tasksThunks)
  const selectedTasksByTodolistId = tasksSelector(todolist.id)
  const tasks = useSelector<AppRootStateType, Array<TaskDomain>>(selectedTasksByTodolistId)
  let filteredTasks = tasks

  useEffect(() => {
    fetchTasks(todolist.id)
  }, [])

  switch (todolist.filter) {
    case 'active':
      filteredTasks = tasks.filter((task) => task.status === TaskStatuses.New)
      break
    case 'completed':
      filteredTasks = tasks.filter((task) => task.status === TaskStatuses.Completed)
      break
  }

  return (
    <>
      {filteredTasks.map((task) => {
        return (
          <Task
            key={task.id}
            task={task}
            todolistId={todolist.id}
          />
        )
      })}
    </>
  )
}

export default TasksList
