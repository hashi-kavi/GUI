import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css'; // Navbar-specific styles

const Navbar = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Determine whether auth buttons should be displayed
  const isLandingPage = location.pathname === '/';

  return (
    <nav>
      <div className="hamburger" onClick={() => setIsMenuOpen(!isMenuOpen)}>
        ☰
      </div>
      <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
        <li><Link to="/">Home</Link></li>
        <li><Link to="/taskmanager">Task Manager</Link></li>
        <li><Link to="/about">About</Link></li>
        <li><Link to="/contact">Contact</Link></li>
      </ul>
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
