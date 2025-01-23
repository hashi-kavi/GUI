import React, { useState } from 'react';
import Calendar from 'react-calendar';
import 'react-calendar/dist/Calendar.css';
import '../styles/CalendarIntegration.css';

const CalendarIntegration = ({ tasks }) => {
  const [selectedDate, setSelectedDate] = useState(new Date());

  // Normalize the selected date (set time to 00:00:00) to match against task dates
  const normalizedSelectedDate = new Date(selectedDate).setHours(0, 0, 0, 0);

  // Filter tasks for the selected date by normalizing the task date as well
  const tasksForSelectedDate = tasks.filter((task) => {
    const taskDate = new Date(task.completion_date).setHours(0, 0, 0, 0);
    return taskDate === normalizedSelectedDate;
  });

  return (
    <div className="calendar-integration">
      <h1>Task Calendar</h1>
      <Calendar
        onChange={setSelectedDate}
        value={selectedDate}
        tileClassName={({ date }) => {
          const taskDate = new Date(date).setHours(0, 0, 0, 0);
          const hasTask = tasks.some(
            (task) => new Date(task.completion_date).setHours(0, 0, 0, 0) === taskDate
          );
          return hasTask ? 'highlight-date' : null;
        }}
      />
      <h3>Tasks for {selectedDate.toLocaleDateString()}</h3>
      <ul className="task-list">
        {tasksForSelectedDate.length > 0 ? (
          tasksForSelectedDate.map((task, index) => (
            <li
              key={index}
              className={`task-item ${task.completed ? 'completed-task' : 'pending-task'}`}
            >
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
