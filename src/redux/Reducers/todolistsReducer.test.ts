import {v1} from "uuid";
import {FilterType, TodolistDomainType, todolistsReducer} from "./todolistsReducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "../actions/todolistsActions";

let startState: Array<TodolistDomainType>
let todolistId1: string
let todolistId2: string
let todolistId3: string

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  todolistId3 = v1()
  startState = [
    {id: todolistId1, title: 'What to learn', filter: 'all', addedDate: '', order: 0},
    {id: todolistId2, title: 'What to buy', filter: 'all', addedDate: '', order: 1}
  ]
})

test('correct todolist should be removed', () => {

  const endState = todolistsReducer(startState, deleteTodolistAC(todolistId1))

  expect(endState.length).toBe(1)
  expect(endState[0].id).toBe(todolistId2)
})


test("todolist title should be edited", () => {

  const newTodolistTitle = "hey hey"
  const endState = todolistsReducer(startState, changeTodolistTitleAC(todolistId1, newTodolistTitle))

  expect(endState.length).toBe(2)
  expect(endState[0].title).toBe("hey hey")
})

test("todolist title should be edited", () => {

  const newTodolistFilter: FilterType = "active"
  const endState = todolistsReducer(startState, changeTodolistFilterAC(todolistId1, newTodolistFilter))

  expect(endState.length).toBe(2)
  expect(endState[0].filter).toBe("active")
})