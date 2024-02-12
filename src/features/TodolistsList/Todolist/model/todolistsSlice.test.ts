import { v1 } from 'uuid'
import {
  FilterType,
  todolistsActions,
  TodolistsInitialStateType,
  todolistsSlice,
  todolistsThunks,
} from 'features/TodolistsList/Todolist/model/todolistsSlice'

let startState: TodolistsInitialStateType
let todolistId1: string
let todolistId2: string

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  startState = {
    todolists: [
      { id: todolistId1, title: 'What to learn', filter: 'all', loadingStatus: 'idle', addedDate: '', order: 0 },
      { id: todolistId2, title: 'What to buy', filter: 'all', loadingStatus: 'idle', addedDate: '', order: 1 },
    ],
  }
})

test('correct todolist should be removed', () => {
  const endState = todolistsSlice(
    startState,
    todolistsThunks.deleteTodolist.fulfilled({ todolistId: todolistId1 }, 'requestId', todolistId1),
  )

  expect(endState.todolists.length).toBe(1)
  expect(endState.todolists[0].id).toBe(todolistId2)
})

test('todolist title should be edited', () => {
  const newTodolistTitle = 'hey hey'
  const payload = { todolistId: todolistId1, title: newTodolistTitle }
  const endState = todolistsSlice(
    startState,
    todolistsThunks.updateTodolistTitle.fulfilled(payload, 'requestId', payload),
  )

  expect(endState.todolists.length).toBe(2)
  expect(endState.todolists[0].title).toBe('hey hey')
})

test('todolist title should be edited', () => {
  const newTodolistFilter: FilterType = 'active'
  const endState = todolistsSlice(
    startState,
    todolistsActions.changeTodolistFilter({ todolistId: todolistId1, filter: newTodolistFilter }),
  )

  expect(endState.todolists.length).toBe(2)
  expect(endState.todolists[0].filter).toBe('active')
})
