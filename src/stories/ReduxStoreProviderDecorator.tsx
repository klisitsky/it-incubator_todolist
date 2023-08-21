import React from 'react';
import {Provider} from "react-redux";
import {AppRootStateType} from "../redux/redux-store";
import {todolistsReducer} from "../redux/Reducers/todolistsReducer";
import {v1} from "uuid";
import {combineReducers, legacy_createStore} from "redux";
import {tasksReducer} from "../redux/Reducers/tasksReducer";


const rootReducer = combineReducers({
 todolists: todolistsReducer,
 tasks: tasksReducer
})
export const todolistId1 = v1();
export const todolistId2 = v1();
export const todolistId3 = v1();

const initialState:AppRootStateType = {
 todolists: [
  {id:todolistId1, title: 'What to learn', filter: 'all'},
  {id:todolistId2, title: 'What to buy', filter: 'active'},
  {id:todolistId3, title: 'What to like', filter: 'completed'}
 ],
 tasks: {
  [todolistId1]:[
   { id: v1(), title: "HTML&CSS", isDone: true },
   { id: v1(), title: "JS", isDone: true },
   { id: v1(), title: "ReactJS", isDone: false },
   { id: v1(), title: "NodeJS", isDone: true }
  ],
  [todolistId2]:[
   { id: v1(), title: "Хлебушек", isDone: false },
   { id: v1(), title: "Молочко", isDone: true },
   { id: v1(), title: "Конфетки", isDone: false },
   { id: v1(), title: "Курочка", isDone: true }
  ],
  [todolistId3]:[
   { id: v1(), title: "Море", isDone: true },
   { id: v1(), title: "Игры", isDone: false },
   { id: v1(), title: "Конфетки", isDone: true }
  ]
 }
}

const store = legacy_createStore(rootReducer, initialState)

const ReduxStoreProviderDecorator = (story: () => React.ReactNode) => {
 return <Provider store={store}>{story()}</Provider>
};

export default ReduxStoreProviderDecorator;