import {
  TodolistsInitialStateType,
  todolistsSlice,
  todolistsThunks,
} from 'features/TodolistsList/Todolist/model/todolistsSlice'
import { AllTasks, tasksSlice } from 'features/TodolistsList/Todolist/Task/model/tasksSlice'

test('ids should be equals', () => {
  const startTasksState: AllTasks = {}
  const startTodolistsState: TodolistsInitialStateType = { todolists: [] }

  const newTodolist = {
    id: 'a2dfe62b-ebce-4b37-9581-1cc77ebc999f',
    title: 'important',
    addedDate: '2019-07-30T12:23:49.677',
    order: 0,
  }
  const action = todolistsThunks.createTodolist.fulfilled({ todolist: newTodolist }, 'requestId', newTodolist.id)

  const endTasksState = tasksSlice(startTasksState, action)
  const endTodolistsState = todolistsSlice(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState.todolists[0].id

  expect(idFromTasks).toBe(action.payload.todolist.id)
  expect(idFromTodolists).toBe(action.payload.todolist.id)
})
