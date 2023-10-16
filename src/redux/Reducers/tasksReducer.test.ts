import {v1} from "uuid";
import {AllTasksType, tasksReducer} from "./tasksReducer";
import {createTaskAC, deleteTaskAC, updateTaskAC} from "../actions/tasksActions";
import {deleteTodolistAC} from "../actions/todolistsActions";
import {TaskPriorities, TaskStatuses} from "../../api/tasks-api";

let todolistId1: string
let todolistId2: string
let startState: AllTasksType

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = {
    [todolistId1]:[
      {
        id: v1(),
        title: "HTML&CSS",
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 1,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "JS",
        addedDate: '',
        status: TaskStatuses.New,
        order: 2,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "ReactJS",
        addedDate: '',
        status: TaskStatuses.New,
        order: 3,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "NodeJS",
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 4,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle'
      }
    ],
    [todolistId2]:[
      {
        id: v1(),
        title: "Хлебушек",
        addedDate: '',
        status: TaskStatuses.New,
        order: 1,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "Молочко",
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 2,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "Конфетки",
        addedDate: '',
        status: TaskStatuses.New,
        order: 3,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "Курочка",
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 4,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle'
      }
    ]
  }

})


test('new task should be added', () => {

  const endState = tasksReducer(startState, createTaskAC(todolistId1, startState[todolistId1][0]))

  expect(startState[todolistId1].length).toBe(4)
  expect(endState[todolistId1].length).toBe(5)
  expect(endState[todolistId1][0].title).toBe("ohhhh")
})

test('the task should be removed', () => {

  const endState = tasksReducer(startState, deleteTaskAC(todolistId1, startState[todolistId1][0].id))

  expect(startState[todolistId1].length).toBe(4)
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe("JS")
})

test('the task status should be changed', () => {

  const endState = tasksReducer(startState, updateTaskAC(todolistId1, startState[todolistId1][0].id, {status: TaskStatuses.New}))

  expect(startState[todolistId1].length).toBe(4)
  expect(endState[todolistId1].length).toBe(4)
  expect(startState[todolistId1][0].status).toBe(TaskStatuses.Completed)
  expect(endState[todolistId1][0].status).toBe(TaskStatuses.New)
})

test('the task title should be changed', () => {

  const endState = tasksReducer(startState, updateTaskAC(todolistId1, startState[todolistId1][0].id, {title: 'bla-bla'}))

  expect(endState[todolistId1].length).toBe(4)
  expect(startState[todolistId1][0].title).toBe("HTML&CSS")
  expect(endState[todolistId1][0].title).toBe('bla-bla')
  expect(startState[todolistId1][0]).not.toBe(endState[todolistId1][0])
})

test('the property with tasks should be removed', () => {

  const endState = tasksReducer(startState, deleteTodolistAC(todolistId1))

  const keys = Object.keys(endState)

  expect(keys.length).toBe(1)
  expect(endState[todolistId1]).not.toBeDefined()
})