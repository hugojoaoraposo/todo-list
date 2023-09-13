import "./App.css"
import { useState } from "react"
import ListIcon from "./assets/icons/list.svg"
import DeleteButton from "./assets/icons/delete.svg"

function App() {
  const [tasks, setTasks] = useState([])

  function addTask() {
    const taskInput = document.getElementById("input-box")
    const taskText = taskInput.value.trim()

    if (taskText !== "") {
      const newTask = {
        id: Date.now(), 
        text: taskText, 
        checked: false, 
        deleted: false }

      setTasks((prevState) => [...prevState, newTask]);
    }

    taskInput.value = ""
  }

  function toggleTaskChecked(index) {
    const updatedTasks = [...tasks]
    
    updatedTasks[index] = {
      ...updatedTasks[index],
      checked: !updatedTasks[index].checked,
    };
    
    setTasks(updatedTasks);
  }

  function deleteTask(id, event) {
    event.stopPropagation(); 
  
    const updatedTasks = tasks.filter((task) => task.id !== id);
    setTasks(updatedTasks);
  }

  return (
    <div className="container">
      <div className="todo-app">
        <h2>
          To-Do List<img src={ListIcon} alt="List Icon"></img>
        </h2>

        <div className="row">
          <input type="text" id="input-box" placeholder="Add your task"></input>
          <button onClick={() => addTask()}>Add</button>
        </div>

        <ul id="list-container">
          {tasks.map((task, index) => (
            <li
              key={index}
              className={task.checked ? "checked" : ""}
              onClick={() => toggleTaskChecked(index)}
            >
              {task.text}
              
              <img
  src={DeleteButton}
  width={12}
  height={12}
  alt="Button"
  onClick={(e) => deleteTask(task.id, e)} // Pass the event here
/>
     
            </li>
          ))}

        </ul>
      </div>
    </div>
  )
}

export default App;
