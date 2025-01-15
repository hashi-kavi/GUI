// src/components/CalendarPage.js
import React from 'react';
import CalendarIntegration from '../components/CalendarIntegration'; // Import your existing CalendarIntegration component

const CalendarPage = ({ allTasks, completedTasks }) => {
  return (
    <div className="calendar-page">
      <h2>Task Calendar</h2>
      <CalendarIntegration tasks={[...allTasks, ...completedTasks]} />
    </div>
  );
};

export default CalendarPage;
