import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarIntegration.css';

const CalendarIntegration = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  const tasksForSelectedDate = tasks.filter(
    (task) =>
      new Date(task.completion_date).toISOString().split('T')[0] ===
      selectedDate.toISOString().split('T')[0]
  );

  return (
    <div className="calendar-integration">
      <h1>Task Calendar</h1>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date }) => {
          const hasTask = tasks.some(
            (task) =>
              new Date(task.completion_date).toISOString().split('T')[0] ===
              date.toISOString().split('T')[0]
          );
          return hasTask ? 'highlight-date' : null;
        }}
      />
      <h3>Tasks for {selectedDate.toLocaleDateString()}</h3>
      <ul className="task-list">
        {tasksForSelectedDate.length > 0 ? (
          tasksForSelectedDate.map((task, index) => (
            <li key={index}>
              <strong>{task.title}</strong>: {task.description}
            </li>
          ))
        ) : (
          <p>No tasks for this date.</p>
        )}
      </ul>
    </div>
  );
};

export default CalendarIntegration;
