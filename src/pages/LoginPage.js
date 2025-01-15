import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LoginPage.css'; // Importing the CSS file

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Skipping the actual login check and directly going to TaskManager
    navigate('/taskmanager'); // Navigate directly to the TaskManager page
  };

  return (
    <div className="authContainer"> {/* Applying the authContainer class */}
      <div className="authCard"> {/* Applying the authCard class */}
        <h1 className="heading">Login</h1> {/* Applying the heading class */}
        <form onSubmit={handleSubmit}>
          <div className="inputGroup"> {/* Applying the inputGroup class */}
            <input
              className="input" // Applying the input class
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup"> {/* Applying the inputGroup class */}
            <input
              className="input" // Applying the input class
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="authBtn" type="submit"> {/* Applying the authBtn class */}
            Login
          </button>
        </form>
        <p className="paragraph"> {/* Applying the paragraph class */}
          Don't have an account?{' '}
          <a href="/signup" className="link"> {/* Applying the link class */}
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;
