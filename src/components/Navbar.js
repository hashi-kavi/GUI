import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import Logout from './Logout'; // Import the Logout component
import './Navbar.css';
import logo from '../assets/images/7.png'; // Import the logo image

const Navbar = () => {
  const userId = localStorage.getItem('userId'); // Used for conditional rendering
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const location = useLocation();

  // Determine whether auth buttons should be displayed
  const isLandingPage = location.pathname === '/';

  // Debugging logs
  console.log('Is Landing Page:', isLandingPage);
  console.log('User ID:', userId);

  return (
    <nav>
      <div className="navbar-container">
        <div className="logo">
        <div className="logo-image"> 
          <img src={logo} alt="Logo"/>
        </div>
        <h2>TasksPro</h2>
        </div>
      

        {/* Hamburger Menu */
        <div className="hamburger" onClick={() => { setIsMenuOpen(!isMenuOpen); console.log(isMenuOpen); }}>
        ☰
      </div>}

        {/* Navigation Links */}
        <ul className={`nav-links ${isMenuOpen ? 'active' : ''}`}>
          <li>
            <Link to="/">Home</Link>
          </li>
          {userId ? (
            // Links for logged-in users
            <>
              <li>
                <Link className='task_manager' to="/taskmanager">Task Manager</Link>
              </li>
              <li>
                <Link to="/calendar">Calendar</Link>
              </li>
              <li>
            <Link to="/about">About</Link>
          </li>
          <div className="logout">
            <Logout/> {/* Show Logout button when logged in */}
          </div>
            </>
            
            
          ) :
           (
            // Links for non-logged-in users
            <>
              <li>
                <Link to="/login">Login</Link>
              </li>
              <li>
                <Link to="/signup">Sign Up</Link>
              </li>
              
            </>
          )}
          
          </ul>
          
          </div>

      {/* Auth buttons for landing page */}
      {isLandingPage && !userId && (
        <div className="auth-buttons">
          <Link to="/login" className="auth-button login-button">Login</Link>
          <Link to="/signup" className="auth-button signup-button">Sign Up</Link>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
