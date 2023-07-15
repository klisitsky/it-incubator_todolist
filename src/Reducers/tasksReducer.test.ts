import {v1} from "uuid";
import {AllTasksType} from "./tasksReducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, tasksReducer, updateTaskAC} from "./tasksReducer";
import {deleteTodolistAC} from "./todolistsReducer";

let todolistId1: string
let todolistId2: string
let startState: AllTasksType

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()

  startState = {
    [todolistId1]:[
      { id: v1(), title: "HTML&CSS", isDone: true },
      { id: v1(), title: "JS", isDone: true },
      { id: v1(), title: "ReactJS", isDone: false },
      { id: v1(), title: "NodeJS", isDone: true }
    ],
    [todolistId2]:[
      { id: v1(), title: "Хлебушек", isDone: true },
      { id: v1(), title: "Молочко", isDone: true },
      { id: v1(), title: "Конфетки", isDone: false },
      { id: v1(), title: "Курочка", isDone: true }
    ]
  }

})


test('new task should be added', () => {

  const newTaskTitle = "ohhhh"
  const endState = tasksReducer(startState, addTaskAC(todolistId1, newTaskTitle))

  expect(startState[todolistId1].length).toBe(4)
  expect(endState[todolistId1].length).toBe(5)
  expect(endState[todolistId1][0].title).toBe("ohhhh")
})

test('the task should be removed', () => {

  const endState = tasksReducer(startState, removeTaskAC(todolistId1, startState[todolistId1][0].id))

  expect(startState[todolistId1].length).toBe(4)
  expect(endState[todolistId1].length).toBe(3)
  expect(endState[todolistId1][0].title).toBe("JS")
})

test('the task status should be changed', () => {

  const endState = tasksReducer(startState, changeTaskStatusAC(todolistId1, startState[todolistId1][0].id, false))

  expect(startState[todolistId1].length).toBe(4)
  expect(endState[todolistId1].length).toBe(4)
  expect(startState[todolistId1][0].isDone).toBe(true)
  expect(endState[todolistId1][0].isDone).toBe(false)
})

test('the task title should be changed', () => {

  const endState = tasksReducer(startState, updateTaskAC(todolistId1, startState[todolistId1][0].id, 'bla-bla'))

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