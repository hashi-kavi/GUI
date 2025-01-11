import React from 'react';
import './HomePage.css'; // Add a corresponding CSS file for styling

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">My ToDo App</div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#tasks">Tasks</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
       
        <button className="cta-button">Sign In</button>
      </header>

      {/* Hero Section */}
      <section className="hero">
        <h1>Boost Your Productivity</h1>
        <p>Organize tasks, track progress, and achieve your goals effortlessly!</p>
        <div className="hero-buttons">
          <button className="primary-button">Get Started for Free</button>
          <button className="secondary-button">Learn More</button>
        </div>
        <img 
          src="/path-to-hero-image.png" 
          alt="Hero illustration" 
          className="hero-image" 
        />
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Why Choose Us?</h2>
        <div className="feature-cards">
          <div className="feature-card">
            <h3>Task Management</h3>
            <p>Create, organize, and prioritize your tasks with ease.</p>
          </div>
          <div className="feature-card">
            <h3>Real-Time Sync</h3>
            <p>Access your tasks anytime, anywhere, across devices.</p>
          </div>
          <div className="feature-card">
            <h3>Progress Tracking</h3>
            <p>Monitor your progress with visual indicators.</p>
          </div>
          <div className="feature-card">
            <h3>Smart Reminders</h3>
            <p>Never miss a deadline with timely notifications.</p>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer">
        <p>&copy; 2024 My ToDo App. All Rights Reserved.</p>
        <ul>
          <li><a href="#privacy">Privacy Policy</a></li>
          <li><a href="#terms">Terms of Service</a></li>
          <li><a href="#contact">Contact Us</a></li>
        </ul>
      </footer>
    </div>
  );
};

export default HomePage;
