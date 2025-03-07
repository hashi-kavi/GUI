import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/TaskComponents.css';
import { AiOutlineDelete } from 'react-icons/ai';
import bell from '../assets/images/bell.png';

const TaskManager = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const [newTitle, setNewTitle] = useState('');
  const [newDescription, setNewDescription] = useState('');
  const [completionDate, setCompletionDate] = useState('');
  const [reminderTime, setReminderTime] = useState('');
  const [isCompleteScreen, setIsCompleteScreen] = useState(false);
  const userId = localStorage.getItem('userId');

  // Fetch tasks from the server
  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await axios.get(`http://localhost:5000/tasks?user_id=${userId}`);
        setAllTasks(response.data.filter(task => task.status === 'pending'));
        setCompletedTasks(response.data.filter(task => task.status === 'completed'));
      } catch (error) {
        console.error('Error fetching tasks:', error);
      }
    };
    fetchTasks();
  }, [userId]);

  // Add a new task
  const handleAddTask = async () => {
    if (!newTitle || !newDescription || !completionDate) {
      alert('Please fill in all fields.');
      return;
    }

    const newTask = {
      title: newTitle,
      description: newDescription,
      completion_date: completionDate,
      reminder_time: reminderTime,
      status: 'pending',
      user_id: userId,
    };

    try {
      const response = await axios.post('http://localhost:5000/tasks', newTask);
      setAllTasks([...allTasks, response.data]);
      setNewTitle('');
      setNewDescription('');
      setCompletionDate('');
      setReminderTime('');
    } catch (error) {
      console.error('Error adding task:', error);
    }
  };

  // Mark a task as completed
  const handleCompleteTask = async (taskId) => {
    try {
      await axios.put(`http://localhost:5000/tasks/${taskId}`, { status: 'completed' });
      const completedTask = allTasks.find(task => task.id === taskId);
      setCompletedTasks([...completedTasks, { ...completedTask, status: 'completed' }]);
      setAllTasks(allTasks.filter(task => task.id !== taskId));
    } catch (error) {
      console.error('Error completing task:', error);
    }
  };

  // Delete a task
  const handleDeleteTask = async (taskId, isCompleted) => {
    try {
      await axios.delete(`http://localhost:5000/tasks/${taskId}`);
      if (isCompleted) {
        setCompletedTasks(completedTasks.filter(task => task.id !== taskId));
      } else {
        setAllTasks(allTasks.filter(task => task.id !== taskId));
      }
    } catch (error) {
      console.error('Error deleting task:', error);
    }
  };

  // Check for reminders
  useEffect(() => {
    if (Notification.permission !== 'granted') {
      Notification.requestPermission();
    }

    const checkReminders = () => {
      allTasks.forEach(async (task) => {
        if (task.reminder_time && new Date(task.reminder_time).getTime() <= Date.now()) {
          new Notification('Task Reminder', { body: `Reminder for: ${task.title}`, icon: bell });
          await axios.put(`http://localhost:5000/tasks/${task.id}`, { reminder_time: null });
          setAllTasks(allTasks.map(t => (t.id === task.id ? { ...t, reminder_time: null } : t)));
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
                    <span role="img" aria-label="completed task">✅</span>
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