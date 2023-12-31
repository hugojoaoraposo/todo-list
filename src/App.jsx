import { useState } from "react";
import ListIcon from "./assets/icons/list.svg";
import DeleteButton from "./assets/icons/delete.svg";
import InfoIcon from "./assets/icons/info.png";
import "./App.css";

function App() {
  const [tasks, setTasks] = useState([]);
  const [isModalVisible, setModalVisible] = useState(false);

  function toggleModal() {
    setModalVisible(!isModalVisible);
  }

  function addTask() {
    const taskInput = document.getElementById("input-box");
    const taskText = taskInput.value.trim();

    if (taskText !== "") {
      const newTask = {
        id: Date.now(),
        text: taskText,
        checked: false,
        deleted: false,
      };

      setTasks((prevState) => [...prevState, newTask]);
    }

    taskInput.value = "";
  }

  function toggleTaskChecked(index) {
    const updatedTasks = [...tasks];

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
        <div className="title-row">
          <h1>
            To-Do List<img src={ListIcon} alt="List Icon"></img>
          </h1>
          <img
            className="info-icon"
            src={InfoIcon}
            alt="List Icon"
            style={{ width: "40px", height: "40px" }}
            onClick={toggleModal}
          ></img>
        </div>
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
                onClick={(e) => deleteTask(task.id, e)}
              />
            </li>
          ))}
        </ul>
      </div>

      {isModalVisible && (
        <div className="modal">
          <div className="modal-content">
            <h2>
              To-Do List 
              <span className="close" onClick={toggleModal}>
                &times;
              </span>
            </h2><br />

       
               <p>1. Enter a task in the input box labeled "Add your
                task." Click the "Add" button to add the task to the list.</p> <br />
             
                <p>2. Click on a task in the list to mark
                it as completed. Completed tasks will be visually distinguished
                with a strikethrough.</p> <br />
           
                <p>3. To delete a task, click on the small delete
                button next to the task. The task will be removed from the to-do
                list.</p>
        
          </div>
        </div>
      )}
    </div>
  );
}

export default App;
