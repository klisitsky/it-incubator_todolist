import {Dispatch} from "redux";
import {TasksApi} from "../../api/tasks-api";
import {createTaskAC, deleteTaskAC, setTasksAC} from "../actions/tasksActions";

export const getTasksTC = (todolistId: string) => (dispatch: Dispatch) => {
  TasksApi.getTasks(todolistId).then(data => {
    dispatch(setTasksAC(todolistId, data.data.items))
  })
}

export const deleteTaskTC = (todolistId: string, taskId: string) => (dispatch: Dispatch) => {
  TasksApi.deleteTask(todolistId, taskId).then(() => {
    dispatch(deleteTaskAC(todolistId, taskId))
  })
}

export const createTaskTC = (todolistId: string, title: string) => (dispatch: Dispatch) => {
  TasksApi.createTask(todolistId, title).then(res => {
    dispatch(createTaskAC(todolistId, res.data.data.item))
  })
}