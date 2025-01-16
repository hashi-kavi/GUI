import React, { useState } from 'react';
import axios from 'axios';

function AddTask() {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    const newTask = { title, description, completion_date: completionDate };

    // Make a POST request to add the task
    axios.post('http://localhost:5000/tasks', newTask)
      .then(response => {
        console.log('Task added:', response.data);
        // Optionally update your state or display a success message
      })
      .catch(error => {
        console.error("Error adding task:", error);
      });
  };

  return (
    <div>
      <h2>Add Task</h2>
      <form onSubmit={handleSubmit}>
        <input
          type="text"
          placeholder="Task Title"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
        />
        <textarea
          placeholder="Task Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <input
          type="date"
          value={completionDate}
          onChange={(e) => setCompletionDate(e.target.value)}
        />
        <button type="submit">Add Task</button>
      </form>
    </div>
  );
}

export default AddTask;
