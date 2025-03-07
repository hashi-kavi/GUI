import React from "react";
import { Link } from "react-router-dom";
import "../styles/LandingPage.css";

const LandingPage = () => {
  return (
    <div className="landingpg">
      <div className="landing-page">
        <header className="landing-header">
          <h1>Welcome to TaskPro</h1>
          <p>Your Personal Productivity Assistant</p>
          <p>Manage tasks, track your progress, and boost your productivity!</p>

          {/* Call-to-Action Button using Link */}
          <div className="cta-container">
            <Link to="/login">
              <button className="cta-button">Get Started</button>
            </Link>
          </div>
        </header>

        {/* Main Content (if any) */}
        <main className="main-content"></main>
      </div>
    </div>
  );
};

export default LandingPage;
