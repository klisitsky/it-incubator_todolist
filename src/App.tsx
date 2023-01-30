import React from 'react';
import './App.css';
import {Todolist} from "./Todolist";

function App() {

  const shapka1 = 'What is to learn-1'
  const shapka11 = 'What is to learn-1111111111111111111111'
  const shapka2 = 'What is to learn-1'
  const shapka22 = 'What is to learn-2222222222222222222222'


  const tasks1 = [
    { id: 1, title: "HTML&CSS", isDone: true },
    { id: 2, title: "JS", isDone: true },
    { id: 3, title: "ReactJS", isDone: false }
  ]
  const tasks2 = [
    { id: 1, title: "Hello world", isDone: true },
    { id: 2, title: "I am Happy", isDone: false },
    { id: 3, title: "Yo", isDone: false }
  ]

  return (
      <div className="App">
        <Todolist newShapka={shapka1} tasks={tasks1}/>
        <Todolist shapka={shapka22} tasks={tasks2}/>
      </div>
  )


}

export default App;
