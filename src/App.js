import React, { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [tasks, setTasks] = useState(() => JSON.parse(localStorage.getItem('tasks')) || []);
  const [newTask, setNewTask] = useState('');

  useEffect(() => {
    localStorage.setItem('tasks', JSON.stringify(tasks));
  }, [tasks]);

  const handleAddTask = () => {
    if (newTask.trim() && !tasks.some(task => task.text === newTask.trim())) {
      setTasks([...tasks, { text: newTask.trim(), completed: false }]);
      setNewTask('');
    }
  };

  const handleToggleTask = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: !task.completed } : task
    );
    setTasks(updatedTasks);
  };

  const handleMarkAsTodo = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: false } : task
    );
    setTasks(updatedTasks);
  };

  const handleMarkAsCompleted = (index) => {
    const updatedTasks = tasks.map((task, i) =>
      i === index ? { ...task, completed: true } : task
    );
    setTasks(updatedTasks);
  };

  const handleDeleteTask = (index) => {
    const updatedTasks = tasks.filter((_, i) => i !== index);
    setTasks(updatedTasks);
  };

  return (
    <div className="App">
      <header className="App-header">
        <h1>Task Manager</h1>
        <div className="task-input">
          <label htmlFor="new-task-input">Add a new task</label>
          <input
            id="new-task-input"
            type="text"
            value={newTask}
            onChange={(e) => setNewTask(e.target.value)}
            placeholder="Enter a new task"
          />
          <button onClick={handleAddTask} className="add-task-btn">
            Add Task
          </button>
        </div>

        {/* ToDo Tasks */}
        <h2>ToDo Tasks</h2>
        {tasks.filter(task => !task.completed).length === 0 && <p>No ToDo tasks!</p>}
        <ul className="task-list">
          {tasks
            .filter(task => !task.completed)
            .map((task, index) => (
              <li key={index} className="task-item">
                <span className="task-text">{task.text}</span>
                <button onClick={() => handleMarkAsCompleted(index)} className="completed-task-btn">
                  Mark as Completed
                </button>
                <button onClick={() => handleDeleteTask(index)} className="delete-task-btn">
                  Delete
                </button>
              </li>
            ))}
        </ul>

        {/* Completed Tasks */}
        <h2>Completed Tasks</h2>
        {tasks.filter(task => task.completed).length === 0 && <p>No Completed tasks!</p>}
        <ul className="task-list">
          {tasks
            .filter(task => task.completed)
            .map((task, index) => (
              <li key={index} className="task-item completed">
                <span className="task-text">{task.text}</span>
                <button onClick={() => handleMarkAsTodo(index)} className="todo-task-btn">
                  Mark as ToDo
                </button>
                <button onClick={() => handleDeleteTask(index)} className="delete-task-btn">
                  Delete
                </button>
              </li>
            ))}
        </ul>
      </header>
    </div>
  );
}

export default App;
