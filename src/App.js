import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import './App.css'; // Global styles
import TaskManager from './components/TaskManager';
import LandingPage from './pages/LandingPage';
import LoginPage from './pages/LoginPage';
import SignUpPage from './pages/SignUpPage';
import Navbar from './components/Navbar';
import CalendarPage from './pages/CalendarPage'; // Import CalendarPage
import '@fortawesome/fontawesome-free/css/all.min.css';


const App = () => {
  return (
    <Router>
      <div>
        {/* Navbar is displayed on all pages */}
        <Navbar />

        {/* Main content area where pages are rendered */}
        <main>
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Landing Page as Home */}
            <Route path="/taskmanager" element={<TaskManager />} />
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route path="/calendar" element={<CalendarPage />} />
          </Routes>
        </main>
      </div>
      <footer/>
    </Router>
  );
};

export default App;
