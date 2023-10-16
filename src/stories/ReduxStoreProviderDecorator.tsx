import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../components/App/redux-store";
import {todolistsReducer} from "../redux/Reducers/todolistsReducer";
import {v1} from "uuid";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../redux/Reducers/tasksReducer";
import {TaskPriorities, TaskStatuses} from "../api/tasks-api";
import {appReducer} from "../redux/Reducers/appReducer";


const rootReducer = combineReducers({
  todolists: todolistsReducer,
  tasks: tasksReducer,
  app: appReducer
})
export const todolistId1 = v1();
export const todolistId2 = v1();
export const todolistId3 = v1();

const initialState: AppRootStateType = {
  todolists: [
    {id: todolistId1, title: 'What to learn', filter: 'all', loadingStatus: 'idle', addedDate: '', order: 1},
    {id: todolistId2, title: 'What to buy', filter: 'active', loadingStatus: 'idle', addedDate: '', order: 2},
    {id: todolistId3, title: 'What to like', filter: 'completed', loadingStatus: 'idle', addedDate: '', order: 3}
  ],
  tasks: {
    [todolistId1]: [
      {
        id: v1(),
        title: "HTML&CSS",
        addedDate: '',
        status: TaskStatuses.New,
        order: 1,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "JS",
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 2,
        deadline: '',
        description: '',
        priority: TaskPriorities.Middle,
        startDate: '',
        todoListId: todolistId1,
        loadingStatus: 'idle'
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
        todoListId: todolistId1,
        loadingStatus: 'idle'
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
        todoListId: todolistId1,
        loadingStatus: 'idle'
      }
    ],
    [todolistId2]: [
      {
        id: v1(),
        title: "Хлебушек",
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 1,
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "Молочко",
        addedDate: '',
        status: TaskStatuses.New,
        order: 2,
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "Конфетки",
        addedDate: '',
        status: TaskStatuses.New,
        order: 3,
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "Курочка",
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 4,
        deadline: '',
        description: '',
        priority: TaskPriorities.Low,
        startDate: '',
        todoListId: todolistId2,
        loadingStatus: 'idle'
      }
    ],
    [todolistId3]: [
      {
        id: v1(),
        title: "Море",
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 1,
        deadline: '',
        description: '',
        priority: TaskPriorities.High,
        startDate: '',
        todoListId: todolistId3,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "Игры",
        addedDate: '',
        status: TaskStatuses.Completed,
        order: 2,
        deadline: '',
        description: '',
        priority: TaskPriorities.High,
        startDate: '',
        todoListId: todolistId3,
        loadingStatus: 'idle'
      },
      {
        id: v1(),
        title: "Конфетки",
        addedDate: '',
        status: TaskStatuses.New,
        order: 3,
        deadline: '',
        description: '',
        priority: TaskPriorities.High,
        startDate: '',
        todoListId: todolistId3,
        loadingStatus: 'idle'
      }
    ]
  },
  app: {
    error: null,
    status: 'loading'
  }
}

const store = legacy_createStore(rootReducer, initialState)

const ReduxStoreProviderDecorator = (story: () => React.ReactNode) => {
  return <Provider store={store}>{story()}</Provider>
};

export default ReduxStoreProviderDecorator;