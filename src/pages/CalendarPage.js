import React, { useEffect, useState } from 'react';
import CalendarIntegration from '../components/CalendarIntegration';
import '../styles/Calendar.css';

const CalendarPage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);
  const userId = localStorage.getItem('userId'); // Get the logged-in user's ID

  useEffect(() => {
    const fetchTasks = async () => {
      try {
        const response = await fetch(`http://localhost:5000/tasks?user_id=${userId}`);
        if (!response.ok) {
          throw new Error('Network response was not ok');
        }
        const data = await response.json();
        setAllTasks(data.filter((task) => task.status === 'pending'));
        setCompletedTasks(data.filter((task) => task.status === 'completed'));
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, [userId]);
//pass the tasks array to the CalendarIntegration component
  return (
    <div className="Calendar-page">
      <CalendarIntegration tasks={[...allTasks, ...completedTasks]} />
    </div>
  );
};

export default CalendarPage;