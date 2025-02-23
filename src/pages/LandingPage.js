import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';

const LandingPage = () => {
  const navigate = useNavigate();

  const handleGetStartedClick = () => {
    navigate('/login'); // Navigate to the Login page
  };

  return (
    <div className="landingpg">
      <div className="landing-page">
        <header className="landing-header">
          <h1>Welcome to TaskPro</h1>
          <p>Your Personal Productivity Assistant</p>
          <p>Manage tasks, track your progress, and boost your productivity!</p>

          {/* Call-to-Action Button */}
          <div className="cta-container">
            <button className="cta-button" onClick={handleGetStartedClick}>
              Get Started
            </button>
          </div>
        </header>

        {/* Main Content (if any) */}
        <main className="main-content"></main>
      </div>
    </div>
  );
};

export default LandingPage;