import React, { useEffect, useState } from 'react';
import CalendarIntegration from '../components/CalendarIntegration';
import '../styles/Calendar.css';

const CalendarPage = () => {
  const [allTasks, setAllTasks] = useState([]);
  const [completedTasks, setCompletedTasks] = useState([]);

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
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="Calendar-page">
      <CalendarIntegration tasks={[...allTasks, ...completedTasks]} />
    </div>
  );
};

export default CalendarPage;
