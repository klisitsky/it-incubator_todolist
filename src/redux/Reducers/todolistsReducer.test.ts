import {v1} from "uuid";
import {FilterType} from "../../App";
import {todolistsReducer, TodolistType} from "./todolistsReducer";
import {changeTodolistFilterAC, changeTodolistTitleAC, deleteTodolistAC} from "../actions/todolistsActions";

let startState: Array<TodolistType>
let todolistId1: string
let todolistId2: string
let todolistId3: string

beforeEach(() => {
  todolistId1 = v1()
  todolistId2 = v1()
  todolistId3 = v1()
  startState = [
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'}
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