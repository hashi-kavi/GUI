import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import '../styles/TaskComponents.css';
import { AiOutlineDelete } from 'react-icons/ai';

const TaskManager = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTitle, setNewTitle] = useState("");
  const [newDescription, setNewDescription] = useState("");
  const [completionDate, setCompletionDate] = useState("");
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch('http://localhost:5000/tasks');
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllTasks(data.filter((task) => task.status === 'pending'));
        setCompletedTasks(data.filter((task) => task.status === 'completed'));
        console.log('Fetched Tasks:', data); // Log fetched tasks
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);
  
  

  const handleAddTask = async () => {
    if (newTitle.trim() === "" || newDescription.trim() === "" || !completionDate) {
      alert("Please fill in all fields.");
      return;
    }

    const newTask = {
      title: newTitle,
      description: newDescription,
      completion_date: completionDate,
      status: 'pending',
    };

    try {
      const response = await fetch('http://localhost:5000/tasks', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(newTask),
      });

      if (!response.ok) {
        throw new Error("Failed to add task");
      }

      const addedTask = await response.json();
      setAllTasks([...allTasks, addedTask]);
      setNewTitle("");
      setNewDescription("");
      setCompletionDate("");
      console.log('Added Task:', addedTask); // Log added task
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'PUT',
      });

      if (!response.ok) {
        throw new Error("Failed to complete task");
      }

      const completedTask = allTasks.find((task) => task.id === taskId);
      setCompletedTasks([...completedTasks, { ...completedTask, status: 'completed' }]);
      setAllTasks(allTasks.filter((task) => task.id !== taskId));
    } catch (error) {
      console.error("Error completing task:", error);
    }
  };

  const handleDeleteTask = async (taskId, isCompleted) => {
    try {
      const response = await fetch(`http://localhost:5000/tasks/${taskId}`, {
        method: 'DELETE',
      });

      if (!response.ok) {
        throw new Error("Failed to delete task");
      }

      if (isCompleted) {
        setCompletedTasks(completedTasks.filter((task) => task.id !== taskId));
      } else {
        setAllTasks(allTasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.error("Error deleting task:", error);
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
            onChange={(e) => setCompletionDate(e.target.value)}
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
                <p><strong>Completion Date:</strong> {task.completion_date}</p>
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
      
      <Link to="/calendar">
        <button className="primaryBtn">Go to Calendar</button>
      </Link>
    </div>
  );
};

export default TaskManager;
