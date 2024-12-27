import React, { useState } from 'react';

function CalendarIntegration() {
  const [events, setEvents] = useState([]);

  const addEvent = () => {
    const eventName = prompt('Enter Event Name:');
    const eventDate = prompt('Enter Event Date (YYYY-MM-DD):');
    if (eventName && eventDate) {
      setEvents([...events, { name: eventName, date: eventDate }]);
    }
  };

  return (
    <div>
      <h2>Calendar Integration</h2>
      <button onClick={addEvent}>Add Event</button>
      <ul>
        {events.map((event, index) => (
          <li key={index}>
            {event.name} - {event.date}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default CalendarIntegration;