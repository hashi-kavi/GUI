import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/TaskComponents.css';
import { AiOutlineDelete } from 'react-icons/ai';
import bell from '../assets/images/bell.png'; // Import the bell image

const TaskManager = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const userId = localStorage.getItem('userId'); // Get the logged-in user's ID

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks?user_id=${userId}`);
        setAllTasks(response.data.filter((task) => task.status === 'pending'));
        setCompletedTasks(response.data.filter((task) => task.status === 'completed'));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [userId]);

  const handleAddTask = async () => {
    if (newTitle.trim() === '' || newDescription.trim() === '' || !completionDate) {
      alert('Please fill in all fields.');
      return;
    }

    const newTask = {
      title: newTitle,
      description: newDescription,
      completion_date: completionDate,
      reminder_time: reminderTime, // Include reminder_time
      status: 'pending',
      user_id: userId, // Include the user_id in the new task
    };

    try {
      const response = await axios.post('http://localhost:5000/tasks', newTask);
      const addedTask = response.data;
      setAllTasks((prevTasks) => [...prevTasks, addedTask]);
      setNewTitle('');
      setNewDescription('');
      setCompletionDate('');
      setReminderTime('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  const handleCompleteTask = async (taskId) => {
    try {
      const response = await axios.put(`http://localhost:5000/tasks/${taskId}`, {
        status: 'completed',
      });

      if (response.status === 200) {
        const completedTask = allTasks.find((task) => task.id === taskId);
        setCompletedTasks((prevTasks) => [...prevTasks, { ...completedTask, status: 'completed' }]);
        setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
      }
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  const handleDeleteTask = async (taskId, isCompleted) => {
    try {
      const response = await axios.delete(`http://localhost:5000/tasks/${taskId}`);

      if (response.status === 200) {
        if (isCompleted) {
          setCompletedTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        } else {
          setAllTasks((prevTasks) => prevTasks.filter((task) => task.id !== taskId));
        }
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };
  useEffect(() => {
    if (Notification.permission !== "granted") {
      Notification.requestPermission();
    }
  }, []);
  useEffect(() => {
    const checkReminders = () => {
      allTasks.forEach(async (task) => {
        if (task.reminder_time) {
          const reminderTime = new Date(task.reminder_time).getTime();
          const now = new Date().getTime();
  
          if (reminderTime <=  now) {
            new Notification("Task Reminder", {
              body: `Reminder for: ${task.title}`,
              icon: bell
            });
  
            // Remove the reminder from the frontend
            setAllTasks((prev) =>
              prev.map((t) =>
                t.id === task.id ? { ...t, reminder_time: null } : t
              )
            );
             // Update the task in the backend to remove reminder_time
          try {
            await axios.put(`http://localhost:5000/tasks/${task.id}`, {
              reminder_time: null, // Remove reminder after showing it
            });

            // Update the state to remove the reminder from frontend
            setAllTasks((prev) =>
              prev.map((t) =>
                t.id === task.id ? { ...t, reminder_time: null } : t
              )
            );
          } catch (error) {
            console.error("Error updating reminder status:", error);
          }
          }
        }
      });
    };
  
    const interval = setInterval(checkReminders, 60000); // Check every minute
    return () => clearInterval(interval);
  }, [allTasks]);
  
  
  const tasksToShow = isCompleteScreen ? completedTasks : allTasks;

  return (
    <div className="taskbg">
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
          <div className="task-input-item">
            <label>Reminder Time</label>
            <input
              type="datetime-local"
              value={reminderTime}
              onChange={(e) => setReminderTime(e.target.value)}
            />
          </div>
          <button onClick={handleAddTask} className="primaryBtn">
            Add Task
          </button>
        </div>

        <div className="btn-group">
          <button
            className={`toggle-btn ${!isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(false)}
          >
            Pending Tasks
          </button>
          <button
            className={`toggle-btn ${isCompleteScreen ? 'active' : ''}`}
            onClick={() => setIsCompleteScreen(true)}
          >
            Completed Tasks
          </button>
        </div>

        <div className="task-list">
          {tasksToShow.length === 0 ? (
            <p style={{ textAlign: 'center', color: 'gray' }}>
              {isCompleteScreen ? 'No completed tasks to show.' : 'No tasks to show.'}
            </p>
          ) : (
            tasksToShow.map((task) => (
              <div key={task.id} className="task-list-item">
                <div>
                  <h3>{task.title}</h3>
                  <p>{task.description}</p>
                  <p><strong>Completion Date:</strong> {task.completion_date}</p>
                  {task.reminder_time && (
                    <p><strong>Reminder Time:</strong> {task.reminder_time}</p>
                  )}
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
    </div>
  );
};

export default TaskManager;
