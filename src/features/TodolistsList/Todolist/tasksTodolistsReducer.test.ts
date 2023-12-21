import {
  todolistsActions,
  TodolistsInitialStateType,
  todolistsReducer,
} from 'features/TodolistsList/Todolist/todolistsReducer'
import { AllTasksType, tasksReducer } from 'features/TodolistsList/Todolist/Task/tasksReducer'

test('ids should be equals', () => {
  const startTasksState: AllTasksType = {}
  const startTodolistsState: TodolistsInitialStateType = { todolists: [] }

  const newTodolist = {
    id: 'a2dfe62b-ebce-4b37-9581-1cc77ebc999f',
    title: 'important',
    addedDate: '2019-07-30T12:23:49.677',
    order: 0,
  }
  const action = todolistsActions.createTodolist({ todolist: newTodolist })

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState.todolists[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
