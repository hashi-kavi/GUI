import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignUpPage.css'; // Importing the CSS file

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    // Here we are just skipping the actual sign-up logic and directly going to TaskManager
    navigate('/taskmanager'); // Navigate directly to the TaskManager page
  };

  return (
    <div className='authContainer'> {/* Applying the authContainer class */}
    <div className='authCard'> {/* Applying the authCard class */}
        <h1 className='heading'>Sign Up</h1> {/* Applying the heading class */}
        <form onSubmit={handleSubmit}>
            <div children='inputGroup'> {/* Applying the inputGroup class */}

        <input
        className='input' // Applying the input class
          type="text"
          placeholder="Full Name"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          required
        />
        </div>
        <div className='inputGroup'> {/* Applying the inputGroup class */}
        <input
       className='input' // Applying the input class\
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
            Sign Up
          </button>
        </form>
        <p className="paragraph"> {/* Applying the paragraph class */}
          Already have an account?{' '}
          <a href="/login" className="link"> {/* Applying the link class */}
            Login
          </a>
        </p>
      </div>
    </div>
    

  );
};

export default SignUpPage;











