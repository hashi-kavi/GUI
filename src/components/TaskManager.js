import React, { useState } from 'react';

function TaskManager() {
  const [tasks, setTasks] = useState([]);
  const [task, setTask] = useState('');

  const addTask = () => {
    if (task) {
      setTasks([...tasks, { text: task, marked: false }]);
      setTask('');
    }
  };

  const toggleMarkTask = (index) => {
    const updatedTasks = tasks.map((t, i) =>
      i === index ? { ...t, marked: !t.marked } : t
    );
    setTasks(updatedTasks);
  };

  const deleteTask = (index) => {
    const filteredTasks = tasks.filter((_, i) => i !== index);
    setTasks(filteredTasks);
  };

  return (
    <div>
      <h2>Task Manager</h2>
      <div>
        <input
          type="text"
          placeholder="Enter a task"
          value={task}
          onChange={(e) => setTask(e.target.value)}
        />
        <button onClick={addTask}>Add Task</button>
      </div>
      <ul>
        {tasks.map((t, index) => (
          <li
            key={index}
            style={{
              textDecoration: t.marked ? 'line-through' : 'none',
              backgroundColor: t.marked ? '#4caf50' : '#333',
              color: t.marked ? 'white' : 'inherit',
            }}
          >
            {t.text}
            <button onClick={() => toggleMarkTask(index)}>
              {t.marked ? 'Unmark' : 'Mark'}
            </button>
            <button onClick={() => deleteTask(index)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskManager;
