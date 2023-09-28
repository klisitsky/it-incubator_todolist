import {v1} from "uuid";
import {AddTodolistActionType, DeleteTodolistActionType, todolistId1, todolistId2} from "./todolistsReducer";
import {addTaskAC, changeTaskStatusAC, removeTaskAC, updateTaskAC} from "../actions/tasksActions";
import {TaskPriorities, TaskStatuses, TaskType} from "../../api/tasks-api";

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


export type AllTasksType = {
  [todolistId: string]: Array<TaskType>
}

const initialState: AllTasksType = {
  [todolistId1]: [
    {
      id: v1(),
      title: "HTML&CSS",
      addedDate: '',
      status: TaskStatuses.Completed,
      order: 1,
      deadline: '',
      description: '',
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todolistId1
    },
    {
      id: v1(),
      title: "JS",
      addedDate: '',
      status: TaskStatuses.New,
      order: 2,
      deadline: '',
      description: '',
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todolistId1
    },
    {
      id: v1(),
      title: "ReactJS",
      addedDate: '',
      status: TaskStatuses.Completed,
      order: 3,
      deadline: '',
      description: '',
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todolistId1
    },
    {
      id: v1(),
      title: "NodeJS",
      addedDate: '',
      status: TaskStatuses.New,
      order: 4,
      deadline: '',
      description: '',
      priority: TaskPriorities.Low,
      startDate: '',
      todoListId: todolistId1
    }
  ],
  [todolistId2]: [
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
      todoListId: todolistId2
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
      todoListId: todolistId2
    },
    {
      id: v1(),
      title: "ReactJS",
      addedDate: '',
      status: TaskStatuses.Completed,
      order: 3,
      deadline: '',
      description: '',
      priority: TaskPriorities.Middle,
      startDate: '',
      todoListId: todolistId2
    },
    {
      id: v1(),
      title: "NodeJS",
      addedDate: '',
      status: TaskStatuses.New,
      order: 4,
      deadline: '',
      description: '',
      priority: TaskPriorities.Middle,
      startDate: '',
      todoListId: todolistId2
    }
  ]
}

export const tasksReducer = (state: AllTasksType = initialState, action: ActionsType): AllTasksType => {
  switch (action.type) {
    case 'ADD-TASK':
      const newTask: TaskType = {
        id: v1(),
        title: action.payLoad.taskTitle,
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 1,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: action.payLoad.todolistId
      }
      return {...state, [action.payLoad.todolistId]: [newTask, ...state[action.payLoad.todolistId]]}

    case 'REMOVE-TASK':
      return {
        ...state,
        [action.payLoad.todolistId]: state[action.payLoad.todolistId].filter(t => t.id !== action.payLoad.taskId)
      }

    case 'CHANGE-STATUS-TASK':
      return {
        ...state, [action.payLoad.todolistId]: state[action.payLoad.todolistId].map(t => t.id === action.payLoad.taskId
          ? {...t, status: action.payLoad.newStatus}
          : t
        )
      }

    case 'CHANGE-TITLE-TASK':
      return {
        ...state, [action.payLoad.todolistId]: state[action.payLoad.todolistId].map(t => t.id === action.payLoad.taskId
          ? {...t, title: action.payLoad.taskTitle}
          : t
        )
      }

    case 'ADD-TODOLIST':
      return {...state, [action.payLoad.todolistId]: []}

    case "DELETE-TODOLIST":
      const stateCopy = {...state}
      delete stateCopy[action.payLoad.todolistId]
      return stateCopy

    default:
      return state
  }
}







