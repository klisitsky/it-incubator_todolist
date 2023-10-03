import {TodolistApi} from "../../api/todolist-api";
import {setTodolists} from "../actions/todolistsActions";
import {Dispatch} from "redux";

export const getTodolistsTC = () => (dispatch: Dispatch) => {
  TodolistApi.getTodolists().then(data => {
    dispatch(setTodolists(data.data))
  })
}