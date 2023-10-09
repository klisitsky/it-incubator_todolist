import {TaskModelType, TasksApi} from "../../api/tasks-api";
import {createTaskAC, deleteTaskAC, setTasksAC, updateTaskAC} from "../actions/tasksActions";
import {AppDispatchType, AppRootStateType, AppThunk} from "../redux-store";

export const getTasksTC = (todolistId: string): AppThunk => (dispatch: AppDispatchType) => {
  TasksApi.getTasks(todolistId).then(data => {
    dispatch(setTasksAC(todolistId, data.data.items))
  })
}
export const deleteTaskTC = (todolistId: string, taskId: string): AppThunk => (dispatch: AppDispatchType) => {
  TasksApi.deleteTask(todolistId, taskId).then(() => {
    dispatch(deleteTaskAC(todolistId, taskId))
  })
}
export const createTaskTC = (todolistId: string, title: string): AppThunk => (dispatch: AppDispatchType) => {
  TasksApi.createTask(todolistId, title).then(res => {
    dispatch(createTaskAC(todolistId, res.data.data.item))
  })
}
export const updateTaskTC = (todolistId: string, taskId: string, task: TaskModelType): AppThunk =>
  (dispatch: AppDispatchType, getState: () => AppRootStateType) => {
  const ourTask = getState().tasks[todolistId].find(t => t.id === taskId)
  const updatedTask = {
    title: ourTask?.title,
    description: ourTask?.description,
    status: ourTask?.status,
    priority: ourTask?.priority,
    startDate: ourTask?.startDate,
    deadline:ourTask?.deadline,
    ...task
  }
  TasksApi.updateTask(todolistId, taskId, updatedTask).then((res) => {
    if (res.data.resultCode === 0) {
      dispatch(updateTaskAC(todolistId, taskId, task))
    }
  })
}