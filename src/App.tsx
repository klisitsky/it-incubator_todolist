import React, {useState} from 'react';
import './App.css';
import {Todolist} from "./Todolist";
import {v1} from "uuid";


export type BtnNameType = 'all' | 'active' | 'completed'



function App() {

  let [tasks, setTasks] = useState([
    { id: v1(), title: "HTML&CSS", isDone: true },
    { id: v1(), title: "JS", isDone: true },
    { id: v1(), title: "ReactJS", isDone: false },
    { id: v1(), title: "NodeJS", isDone: true }
  ])
  let [title, setTitle] = useState<string>('')
  let [error, setError] = useState<string|null>(null)


  const addTask = (title:string) => {
    title = title.trim()
    if(title) {
      let newTask = { id: v1(), title: title, isDone: false }
      setTasks([...tasks, newTask])
      // setError(null)
    } else {
      setError('Заполни поле епта')
      // setTimeout(() => {setError(null)}, 2000)
    }
    setTitle('')
  }

  const removeTask = (id:string) => {
    setTasks(tasks.filter(el => el.id !== id))
  }

  const onChangeCheckBox = (id: string, isDone:boolean) => {
    const task = tasks.find(t => t.id === id)
    if (task) {
      task.isDone = isDone;
      setTasks([...tasks])
    }

  }



  return (
      <div className="App">
        <Todolist
          newShapka={'What is to learn-1'}
          tasks={tasks}
          removeTask={removeTask}
          addTask={addTask}
          title={title}
          setTitle={setTitle}
          error={error}
          setError={setError}
          callbackOnChangeChkBox={onChangeCheckBox}
        />
      </div>
  )


}

export default App;
