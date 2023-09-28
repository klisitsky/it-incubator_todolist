import {TodolistDomainType, todolistsReducer} from "./todolistsReducer";
import {AllTasksType, tasksReducer} from "./tasksReducer";
import {addTodolistAC} from "../actions/todolistsActions";


test('ids should be equals', () => {
  const startTasksState: AllTasksType = {}
  const startTodolistsState: Array<TodolistDomainType> = []

  const action = addTodolistAC('new todolist')

  const endTasksState = tasksReducer(startTasksState, action)
  const endTodolistsState = todolistsReducer(startTodolistsState, action)

  const keys = Object.keys(endTasksState)
  const idFromTasks = keys[0]
  const idFromTodolists = endTodolistsState[0].id

  expect(idFromTasks).toBe(action.payLoad.todolistId)
  expect(idFromTodolists).toBe(action.payLoad.todolistId)
})