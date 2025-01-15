import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';


const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Determine whether auth buttons should be displayed
  const isLandingPage = location.pathname === '/';

  return (
    <nav>
      <div className='navbar-container'>  
      <div className="logo">
        <h2>TasksPro</h2>
      </div>
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/taskmanager">Task Manager</Link></li>
        <Link to="/calendar">Calendar</Link>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
        

      </ul>
      </div>
      
      {isLandingPage && (
        <div className="auth-buttons">
          <Link to="/login" className="auth-button login-button">Login</Link>
          <Link to="/signup" className="auth-button signup-button">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
