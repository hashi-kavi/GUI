import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TaskComponents.css';
import { AiOutlineDelete } from 'react-icons/ai';

const TaskManager = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completionDate, setCompletionDate] = useState("");  // For storing due date
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  const handleAddTask = () => {
    if (newTitle.trim() === "" || newDescription.trim() === "") {
      alert("Please enter both title and description.");
      return;
    }
    if (!completionDate) {
      alert("Please enter a completion date.");
      return;
    }

    const newTask = {
      title: newTitle,
      description: newDescription,
      dueDate: completionDate, // Store the due date
      id: Date.now(),
    };

    setAllTasks([...allTasks, newTask]);
    setNewTitle("");
    setNewDescription("");
    setCompletionDate("");  // Reset completion date after task is added
  };

  const handleCompleteTask = (taskId) => {
    const taskToComplete = allTasks.find((task) => task.id === taskId);
    if (taskToComplete) {
      setAllTasks(allTasks.filter((task) => task.id !== taskId));
      setCompletedTasks([...completedTasks, taskToComplete]);
    }
  };

  const handleDeleteTask = (taskId, isCompleted) => {
    if (isCompleted) {
      setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
    } else {
      setAllTasks(allTasks.filter((task) => task.id !== taskId));
    }
  };

  const tasksToShow = isCompleteScreen ? completedTasks : allTasks;

  return (
    <div className="task-manager">
      <h1>MY TASKS</h1>
      <div className="task-input">
        <div className="task-input-item">
          <label>Title</label>
          <input
            type="text"
            value={newTitle}
            onChange={(e) => setNewTitle(e.target.value)}
            placeholder="Enter task title"
          />
        </div>
        <div className="task-input-item">
          <label>Description</label>
          <input
            type="text"
            value={newDescription}
            onChange={(e) => setNewDescription(e.target.value)}
            placeholder="Enter task description"
          />
        </div>
        <div className="task-input-item">
          <label>Completion Date</label>
          <input
            type="date"
            value={completionDate}
            onChange={(e) => setCompletionDate(e.target.value)}  // Handling completion date
          />
        </div>
        <button onClick={handleAddTask} className="primaryBtn">
          Add Task
        </button>
      </div>

      <div className="btn-group">
        <button
          className={`toggle-btn ${!isCompleteScreen ? "active" : ""}`}
          onClick={() => setIsCompleteScreen(false)}
        >
          Pending Tasks
        </button>
        <button
          className={`toggle-btn ${isCompleteScreen ? "active" : ""}`}
          onClick={() => setIsCompleteScreen(true)}
        >
          Completed Tasks
        </button>
      </div>

      <div className="task-list">
        {tasksToShow.length === 0 ? (
          <p style={{ textAlign: "center", color: "gray" }}>
            {isCompleteScreen
              ? "No completed tasks to show."
              : "No tasks to show."}
          </p>
        ) : (
          tasksToShow.map((task) => (
            <div key={task.id} className="task-list-item">
              <div>
                <h3>{task.title}</h3>
                <p>{task.description}</p>
                <p><strong>Due Date:</strong> {task.dueDate}</p> {/* Display due date */}
              </div>
              <div className="task-actions">
                {!isCompleteScreen && (
                  <span
                    className="icon complete-icon"
                    onClick={() => handleCompleteTask(task.id)}
                  >
                    ✅
                  </span>
                )}
                <AiOutlineDelete
                  className="icon delete-icon"
                  onClick={() => handleDeleteTask(task.id, isCompleteScreen)}
                  title="Delete"
                />
              </div>
            </div>
          ))
        )}
      </div>

      {/* Add a link to navigate to the Calendar Page */}
      <Link to={{ pathname: '/calendar', state: { tasks: allTasks } }}>Go to Calendar</Link>

    </div>
  );
};

export default TaskManager;
