import React from 'react';

function TaskInput({ newTaskTitle, setNewTaskTitle, newTaskDescription, setNewTaskDescription, handleAddTask }) {
  return (
    <div className="task-input">
      <input
        type="text"
        placeholder="Task Title"
        value={newTaskTitle}
        onChange={(e) => setNewTaskTitle(e.target.value)}
      />
      <textarea
        placeholder="Task Description"
        value={newTaskDescription}
        onChange={(e) => setNewTaskDescription(e.target.value)}
      />
      <button
        className="primary-button"
        onClick={handleAddTask}
        disabled={!newTaskTitle.trim() || !newTaskDescription.trim()}
      >
        Add Task
      </button>
    </div>
  );
}

export default TaskInput;
