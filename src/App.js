import React, { useState } from 'react';
import './App.css';

function App() {
  
  const [tasks, setTasks] = useState([]);
  const [newTask, setNewTask] = useState('');

  
  const handleAddTask = () => {
    if (newTask) {
      setTasks([...tasks, newTask]);
      setNewTask(''); 
    }
  };

  
  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((task, taskIndex) => taskIndex !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        
        {}
        <div>
          <input
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button onClick={handleAddTask}>Add Task</button>
        </div>

        {}
        <ul>
          {tasks.map((task, index) => (
            <li key={index}>
              {task} <button onClick={() => handleDeleteTask(index)}>Delete</button>
            </li>
          ))}
        </ul>
      </header>
    </div>
  );
}

export default App;