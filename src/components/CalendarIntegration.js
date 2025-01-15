import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarIntegration.css';

const CalendarIntegration = ({ tasks = [] }) => { // Default to empty array if tasks is undefined
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Filter tasks for the selected date
  const tasksForSelectedDate = tasks.filter(
    (task) => new Date(task.dueDate).toDateString() === selectedDate.toDateString() // Use dueDate here
  );

  return (
    <div className="calendar-integration">
      <h1>Task Calendar</h1>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date }) => {
          // Highlight dates with tasks
          const hasTask = tasks.some(
            (task) => new Date(task.dueDate).toDateString() === date.toDateString() // Use dueDate here
          );
          return hasTask ? 'highlight-date' : null;
        }}
      />
      <h3>Tasks for {selectedDate.toDateString()}</h3>
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
