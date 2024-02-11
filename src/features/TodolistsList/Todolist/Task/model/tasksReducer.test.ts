import { v1 } from 'uuid'
import { AllTasks, tasksReducer, tasksThunks } from 'features/TodolistsList/Todolist/Task/model/tasksReducer'
import { TaskStatuses } from 'features/TodolistsList/Todolist/Task/api/tasksApi'
import { todolistsThunks } from 'features/TodolistsList/Todolist/model/todolistsReducer'
import { TaskPriorities } from 'common/enums'

let todolistId1: string
let todolistId2: string
let startState: AllTasks

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = {
    [todolistId1]: [
      {
        id: v1(),
        title: 'HTML&CSS',
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 1,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle',
      },
      {
        id: v1(),
        title: 'JS',
        addedDate: '',
        status: TaskStatuses.New,
        order: 2,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle',
      },
      {
        id: v1(),
        title: 'ReactJS',
        addedDate: '',
        status: TaskStatuses.New,
        order: 3,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle',
      },
      {
        id: v1(),
        title: 'NodeJS',
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 4,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle',
      },
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: 'Хлебушек',
        addedDate: '',
        status: TaskStatuses.New,
        order: 1,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle',
      },
      {
        id: v1(),
        title: 'Молочко',
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 2,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle',
      },
      {
        id: v1(),
        title: 'Конфетки',
        addedDate: '',
        status: TaskStatuses.New,
        order: 3,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle',
      },
      {
        id: v1(),
        title: 'Курочка',
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 4,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle',
      },
    ],
  }
})

test('new task should be added', () => {
  const task = {
    id: v1(),
    title: 'HTML&CSS',
    addedDate: '',
    status: TaskStatuses.Completed,
    order: 1,
    deadline: '',
    description: '',
    priority: TaskPriorities.Middle,
    startDate: '',
    todoListId: todolistId1,
    loadingStatus: 'idle',
  }

  const endState = tasksReducer(
    startState,
    tasksThunks.createTask.fulfilled({ task }, 'requestId', {
      todolistId: todolistId1,
      title: 'HTML&CSS',
    }),
  )

  expect(startState[todolistId1].length).toBe(4)
  expect(endState[todolistId1].length).toBe(5)
  expect(endState[todolistId1][0].title).toBe('HTML&CSS')
})

test('the task should be removed', () => {
  const payLoad = { todolistId: todolistId1, taskId: startState[todolistId1][0].id }
  const endState = tasksReducer(startState, tasksThunks.deleteTask.fulfilled(payLoad, 'requestId', payLoad))

  expect(startState[todolistId1].length).toBe(4)
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe('JS')
})

test('the task status should be changed', () => {
  const payLoad = {
    todolistId: todolistId1,
    taskId: startState[todolistId1][0].id,
    taskModel: { status: TaskStatuses.New },
  }

  const endState = tasksReducer(startState, tasksThunks.updateTask.fulfilled(payLoad, 'requestId', payLoad))

  expect(startState[todolistId1].length).toBe(4)
  expect(endState[todolistId1].length).toBe(4)
  expect(startState[todolistId1][0].status).toBe(TaskStatuses.Completed)
  expect(endState[todolistId1][0].status).toBe(TaskStatuses.New)
})

test('the task title should be changed', () => {
  const payLoad = {
    todolistId: todolistId1,
    taskId: startState[todolistId1][0].id,
    taskModel: { title: 'bla-bla' },
  }

  const endState = tasksReducer(startState, tasksThunks.updateTask.fulfilled(payLoad, 'requestId', payLoad))

  expect(endState[todolistId1].length).toBe(4)
  expect(startState[todolistId1][0].title).toBe('HTML&CSS')
  expect(endState[todolistId1][0].title).toBe('bla-bla')
  expect(startState[todolistId1][0]).not.toBe(endState[todolistId1][0])
})

test('the property with tasks should be removed', () => {
  const endState = tasksReducer(
    startState,
    todolistsThunks.deleteTodolist.fulfilled({ todolistId: todolistId1 }, 'requestId', todolistId1),
  )

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistId1]).not.toBeDefined()
})
