import React, {useState} from 'react';
import './App.css';
import {TaskType, Todolist} from "./Todolist";
import {v1} from "uuid";
import {AddItemForm} from "./components/AddItemForm/AddItemForm";


export type FilterType = 'all' | 'active' | 'completed'


type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

type AllTasksType = {
  [todolistId: string]: Array<TaskType>
}

function App() {

  const todolistId1 = v1();
  const todolistId2 = v1();

  const [todolists, setTodolists] = useState<Array<TodolistType>>([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ])

  const changeFilter = (todolistId: string, newFilter:FilterType) => {
    setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, filter:newFilter}: todo))
  }
  const changeTodolistTitle = (todolistId:string, newTodolistTitle: string) => {
    setTodolists(todolists.map(todo => todo.id === todolistId ? {...todo, title:newTodolistTitle}: todo))
  }
  const deleteTodolist = (todolistId: string) => {
    setTodolists(todolists.filter(todo => todo.id !== todolistId))
  }

  const [tasks, setTasks] = useState<AllTasksType>({
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
  })

  const addTask = (todolistId: string, taskTitle:string) => {
      const newTask = { id: v1(), title: taskTitle, isDone: false }
      setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
   }
  const updateTask = (todolistId: string, taskId: string, taskTitle:string) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(task => task.id === taskId
        ? {...task, title:taskTitle}
        : task)}
    )
  }

  const removeTask = (todolistId: string, taskId:string) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].filter(task => task.id !== taskId)})
  }
  const onChangeCheckBox = (todolistId: string, taskId: string, newIsDone:boolean) => {
    setTasks({...tasks, [todolistId]:tasks[todolistId].map(task => {
        return task.id === taskId ? {...task, isDone: newIsDone} : task
    }
    )})
  }

  const callbackAddItemFormHandler = (newTitle:string) => {
    const newTotolistId = v1();
    const newTodolist: TodolistType = {id: newTotolistId, title: newTitle, filter: 'all'}
    setTodolists([...todolists, newTodolist])
    setTasks({...tasks, [newTotolistId]:[]})
  }


  return (
      <div className="App">
        <AddItemForm callback={callbackAddItemFormHandler} placeholder={'Новый список задач'}/>
        {todolists.map(todo => {

          let filteredTasks = tasks[todo.id]

          switch (todo.filter) {
            case 'active':
              filteredTasks = tasks[todo.id].filter(task => !task.isDone)
              break;
            case 'completed':
              filteredTasks = tasks[todo.id].filter(task => task.isDone)
              break;
          }

          return <Todolist
            key={todo.id}
            todolistId={todo.id}
            newShapka={todo.title}
            tasks={filteredTasks}
            removeTask={removeTask}
            addTask={addTask}
            callbackOnChangeChkBox={onChangeCheckBox}
            filter={todo.filter}
            changeFilter={changeFilter}
            deleteTodolist={deleteTodolist}
            updateTask={updateTask}
            changeTodolistTitle={changeTodolistTitle}
          />
        })}

      </div>
  )


}

export default App;
