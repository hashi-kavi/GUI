import React, { useEffect, useState } from 'react';
import axios from 'axios';

function TaskList() {
  const [tasks, setTasks] = useState([]);

  useEffect(() => {
    // Fetch tasks when the component mounts
    axios.get('http://localhost:5000/tasks')  // Your backend URL
      .then(response => {
        setTasks(response.data);  // Set the tasks to state
      })
      .catch(error => {
        console.error("Error fetching tasks:", error);
      });
  }, []);

  return (
    <div>
      <h1>Task List</h1>
      <ul>
        {tasks.map(task => (
          <li key={task.id}>
            <h3>{task.title}</h3>
            <p>{task.description}</p>
            <p>Status: {task.status}</p>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default TaskList;
