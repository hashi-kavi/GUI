import React from 'react';
import { Link } from 'react-router-dom'; // ✅ Import Link
import '../styles/About.css';

export default function About() {
  return (
    <div className="about-container">
      <h1>About TaskPro</h1>
      <p>
        TasksPro is a productivity-focused task management application designed to help you 
        stay organized, boost efficiency, and track your tasks effortlessly.
      </p>
      <h3>Key Features:</h3>
      <ul>
        <li>Create, edit, and delete tasks</li>
        <li>Calendar integration for scheduling</li>
        <li>Mark tasks as completed</li>
        <li>Set reminders and deadlines</li>
        <li>Track your productivity</li>
      </ul>
      <h2>Why Use TasksPro?</h2>
      <p>
        Whether you're managing personal projects or team collaborations, TasksPro provides a 
        simple and effective way to stay on top of your tasks.
      </p>

      <div className="cta-buttons"> 
        <Link to="/signup" className="btn">Get Started</Link> 
      </div>
    </div>
  );
}
