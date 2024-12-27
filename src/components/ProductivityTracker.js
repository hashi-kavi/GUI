import React, { useState } from 'react';

function ProductivityTracker() {
  const [tasksCompleted, setTasksCompleted] = useState(0);

  const incrementTasksCompleted = () => {
    setTasksCompleted(tasksCompleted + 1);
  };

  return (
    <div>
      <h2>Productivity Tracker</h2>
      <p>Tasks Completed: {tasksCompleted}</p>
      <button onClick={incrementTasksCompleted}>Mark Task as Completed</button>
    </div>
  );
}

export default ProductivityTracker;