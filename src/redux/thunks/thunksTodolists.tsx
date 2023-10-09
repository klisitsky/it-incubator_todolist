import {TodolistApi} from "../../api/todolist-api";
import {changeTodolistTitleAC, createTodolistAC, deleteTodolistAC, setTodolists} from "../actions/todolistsActions";
import {AppDispatchType, AppThunk} from "../redux-store";

export const getTodolistsTC = (): AppThunk => (dispatch: AppDispatchType) => {
  TodolistApi.getTodolists().then(data => {
    dispatch(setTodolists(data.data))
  })
}
export const createTodolistTC = (title: string): AppThunk => (dispatch: AppDispatchType) => {
  TodolistApi.createTodolist(title).then(data => {
    dispatch(createTodolistAC(data.data.data.item))
  })
}
export const deleteTodolistTC = (todolistId: string): AppThunk => (dispatch: AppDispatchType) => {
  TodolistApi.deleteTodolist(todolistId).then(() => {
    dispatch(deleteTodolistAC(todolistId))
  })
}
export const updateTodolistTC = (todolistId: string, title: string): AppThunk => (dispatch: AppDispatchType) => {
  TodolistApi.updateTodolist(todolistId, title).then(() => {
    dispatch(changeTodolistTitleAC(todolistId, title))
  })
}