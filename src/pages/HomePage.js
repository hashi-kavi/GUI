import React from 'react';
import './HomePage.css'; // Include corresponding CSS for styling

const HomePage = () => {
  return (
    <div className="home-page">
      {/* Navigation Bar */}
      <header className="navbar">
        <div className="logo">TaskPro</div>
        <nav>
          <ul>
            <li><a href="#home">Home</a></li>
            <li><a href="#features">Features</a></li>
            <li><a href="#testimonials">Testimonials</a></li>
            <li><a href="#about">About</a></li>
            <li><a href="#contact">Contact</a></li>
          </ul>
        </nav>
        <button className="cta-button">Sign In</button>
      </header>

      {/* Hero Section */}
      <section className="hero" id="home">
        <div className="hero-content">
          <h1>Welcome to TaskPro</h1>
          <p>Boost your productivity with smarter task management.</p>
          <div className="hero-buttons">
            <button className="primary-button">Get Started for Free</button>
            <button className="secondary-button">Learn More</button>
          </div>
        </div>
        <img 
          src="/path-to-hero-image.png" 
          alt="Productivity Illustration" 
          className="hero-image" 
        />
      </section>

      {/* Features Section */}
      <section className="features" id="features">
        <h2>Features</h2>
        <div className="feature-list">
          <div className="feature-item">
            <h3>Task Management</h3>
            <p>Easily create, organize, and prioritize your tasks.</p>
          </div>
          <div className="feature-item">
            <h3>Real-Time Sync</h3>
            <p>Access your tasks on all your devices seamlessly.</p>
          </div>
          <div className="feature-item">
            <h3>Progress Tracking</h3>
            <p>Stay on top of your goals with visual progress indicators.</p>
          </div>
          <div className="feature-item">
            <h3>Smart Reminders</h3>
            <p>Never miss a deadline with customizable notifications.</p>
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="testimonials" id="testimonials">
        <h2>What Our Users Say</h2>
        <div className="testimonial-list">
          <div className="testimonial-item">
            <p>"TaskPro has transformed how I manage my day-to-day tasks!"</p>
            <span>- Sarah M.</span>
          </div>
          <div className="testimonial-item">
            <p>"The real-time sync feature is a lifesaver."</p>
            <span>- John D.</span>
          </div>
          <div className="testimonial-item">
            <p>"I love the simplicity and ease of use."</p>
            <span>- Emily R.</span>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="footer" id="contact">
        <p>&copy; 2025 TaskPro. All Rights Reserved.</p>
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
