import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Global styles
import TaskManager from './components/TaskManager';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';

const AboutPage = () => (
  <div className="page-container">
    <h1>About Page</h1>
    <p>Learn more about our application and team.</p>
  </div>
);

const ContactPage = () => (
  <div className="page-container">
    <h1>Contact Page</h1>
    <p>Contact us for support or feedback.</p>
  </div>
);

const App = () => {
  return (
    <Router>
      <div>
        <Navbar />
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} />
            <Route path="/taskmanager" element={<TaskManager />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/contact" element={<ContactPage />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
};

export default App;
