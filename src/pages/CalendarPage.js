import React, { useEffect, useState } from 'react';
import CalendarIntegration from '../components/CalendarIntegration';

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
        console.log('Fetched Tasks:', data);
      } catch (error) {
        console.error("Error fetching tasks:", error);
      }
    };
    fetchTasks();
  }, []);

  return (
    <div className="calendar-page">
      <h2>Task Calendar</h2>
      <CalendarIntegration tasks={[...allTasks, ...completedTasks]} />
    </div>
  );
};

export default CalendarPage;
