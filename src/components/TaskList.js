import React from 'react';

const TaskList = ({ tasks, onToggleTask, onDeleteTask }) => {
  const renderTasks = (filterFn, completed) => (
    tasks.filter(filterFn).map((task, index) => (
      <div key={index} className={`task-item ${completed ? 'completed' : ''}`}>
        <h3>{task.title}</h3>
        <p>{task.description}</p>
        <button onClick={() => onToggleTask(index)}>
          {completed ? 'Undo' : 'Complete'}
        </button>
        <button onClick={() => onDeleteTask(index)}>Delete</button>
      </div>
    ))
  );

  return (
    <div className="task-container">
      <div>
        <h2>Todo</h2>
        {tasks.filter((task) => !task.completed).length === 0 ? (
          <p>No pending tasks</p>
        ) : (
          renderTasks((task) => !task.completed, false)
        )}
      </div>
      <div>
        <h2>Completed</h2>
        {tasks.filter((task) => task.completed).length === 0 ? (
          <p>No completed tasks</p>
        ) : (
          renderTasks((task) => task.completed, true)
        )}
      </div>
    </div>
  );
};

export default TaskList;
