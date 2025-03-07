import React from 'react';
import '../styles/Footer.css'; 

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-middle">
        <div className="footer-column">
          <h3>Contact Us</h3>
          <p>Phone: +94714747775</p>
        </div>
        <div className="footer-column">
          <h3>Quick Links</h3>
          <ul>
            <li><a href="/">Home</a></li>
            <li><a href="/signup">Sign Up</a></li>
          </ul>
        </div>
        <div className="footer-column">
          <h3>About TaskPro</h3>
          <ul>
            <li><a href="/about">About Us</a></li>
            <li><a href="/privacy-policy">Privacy Policy</a></li>
            <li><a href="/terms">Terms & Conditions</a></li>
            
          </ul>
        </div>
        <div className="footer-column">
          <h3>Social Media</h3>
          <div className="social-icons">
            <a href="https://www.instagram.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-instagram"></i></a>
            <a href="https://www.twitter.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-twitter"></i></a>
            <a href="https://www.linkedin.com" target="_blank" rel="noopener noreferrer"><i className="fab fa-linkedin-in"></i></a>
          </div>
        </div>
      </div>

      <div className="footer-bottom">
        <p>&copy; 2025 TaskPro. All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
