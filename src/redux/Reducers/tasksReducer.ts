import {v1} from "uuid";
import {AddTodolistActionType, DeleteTodolistActionType, todolistId1, todolistId2} from "./todolistsReducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "../actions/tasksActions";

export type AddTaskActionType = ReturnType<typeof addTaskAC>
export type RemoveTaskActionType = ReturnType<typeof removeTaskAC>
export type ChangeTaskStatusActionType = ReturnType<typeof changeTaskStatusAC>
export type UpdateTaskActionType = ReturnType<typeof updateTaskAC>

type ActionsType = AddTaskActionType
    | RemoveTaskActionType
    | ChangeTaskStatusActionType
    | UpdateTaskActionType
    | AddTodolistActionType
    | DeleteTodolistActionType

export type TaskType = {
  id: string
  title: string
  isDone: boolean
}

export type AllTasksType = {
  [todolistId: string]: Array<TaskType>
}

const initialState: AllTasksType = {
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

export const tasksReducer = (state: AllTasksType = initialState, action: ActionsType):AllTasksType => {
  switch (action.type) {
    case 'ADD-TASK':
        const newTask = { id: v1(), title: action.payLoad.taskTitle, isDone: false }
        return {...state, [action.payLoad.todolistId]:[newTask, ...state[action.payLoad.todolistId]]}

    case 'REMOVE-TASK':
      return {...state, [action.payLoad.todolistId]:state[action.payLoad.todolistId].filter(t => t.id !== action.payLoad.taskId)}

    case 'CHANGE-STATUS-TASK':
      return {...state, [action.payLoad.todolistId]:state[action.payLoad.todolistId].map(t => t.id === action.payLoad.taskId
            ? {...t, isDone: action.payLoad.newIsDone}
            : t
          )}

    case 'UPDATE-TASK':
      return {...state, [action.payLoad.todolistId]:state[action.payLoad.todolistId].map(t => t.id === action.payLoad.taskId
            ? {...t, title:action.payLoad.taskTitle}
            : t
          )}

    case 'ADD-TODOLIST':
      return {...state, [action.payLoad.todolistId]:[]}

    case "DELETE-TODOLIST":
      const stateCopy = {...state}
      delete stateCopy[action.payLoad.todolistId]
      return stateCopy

    default:
      return state
  }
}







