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
import Footer from './components/Footer'; // Import Footer
import ProtectedRoute from './components/ProtectedRoute'; // Import ProtectedRoute
import About from './pages/About';

const App = () => {
  return (
    <Router>
      <div className="app-container">
        {/* Navbar is displayed on all pages */}
        <Navbar />

        {/* Main content area where pages are rendered */}
        <main className="main-content">
          <Routes>
            <Route path="/" element={<LandingPage />} /> {/* Landing Page as Home */}
            <Route path="/login" element={<LoginPage />} />
            <Route path="/signup" element={<SignUpPage />} />
            <Route
              path="/taskmanager"
              element={
                <ProtectedRoute>
                  <TaskManager />
                </ProtectedRoute>
              }
            />
            <Route
              path="/calendar"
              element={
                <ProtectedRoute>
                  <CalendarPage />
                </ProtectedRoute>
              }
            />
            <Route path="/about" element={<About/>} />

          </Routes>
        </main>

        {/* Footer */}
        <Footer />
      </div>
    </Router>
  );
};

export default App;