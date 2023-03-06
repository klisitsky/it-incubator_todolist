import React, {useState} from 'react';
import './App.css';
import {TaskPropsType, Todolist} from "./Todolist";
import {v1} from "uuid";


export type FilterType = 'all' | 'active' | 'completed'


type TodolistType = {
  id: string
  title: string
  filter: FilterType
}

type AllTasksType = {
  [todolistId: string]: Array<TaskPropsType>
}

function App() {

  let todolistId1 = v1();
  let todolistId2 = v1();

  let [tasks, setTasks] = useState<AllTasksType>({
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

  let [todolist, setTodolist] = useState<Array<TodolistType>>([
    {id: todolistId1, title: 'What to learn', filter: 'all'},
    {id: todolistId2, title: 'What to buy', filter: 'all'},
  ])

  const changeFilter = (todolistId: string, newFilter:FilterType) => {
    setTodolist(todolist.map(todo => todo.id === todolistId ? {...todo, filter:newFilter}: todo))
  }

  const deleteTodolist = (todolistId: string) => {
    setTodolist(todolist.filter(todo => todo.id !== todolistId))
  }

  const addTask = (todolistId: string,
                   taskTitle:string,
                   setError: (err: string | null) => void,
                   setTitle: (val: string) => void
  ) => {
    taskTitle = taskTitle.trim()
    if(taskTitle) {
      const newTask = { id: v1(), title: taskTitle, isDone: false }
      setTasks({...tasks, [todolistId]:[newTask, ...tasks[todolistId]]})
      setError(null)
    } else {
      setError('Заполни поле епта')
      setTimeout(() => {setError(null)}, 2000)
    }
    setTitle('')
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
  return (
      <div className="App">
        {todolist.map(todo => {

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
          />
        })}

      </div>
  )


}

export default App;
