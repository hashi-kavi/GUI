import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUpPage.css';

const SignUpPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await axios.post('http://localhost:5000/signup', { email, password });
      if (response.data.message === 'User created successfully') {
        localStorage.setItem('userId', response.data.userId); // Save userId to localStorage
        navigate('/taskmanager'); // Redirect to task manager page
      }
    } catch (err) {
      if (err.response && err.response.data.error === 'User already exists') {
        setError('Email already exists. Please use a different email.');
      } else {
        setError('Sign-up failed. Please try again.');
      }
    }
  };

  return (
    <div className="authContainer">
      <div className="authCard">
        <h1 className="heading">Sign Up</h1>
        {error && <p>{error}</p>}
        <form onSubmit={handleSubmit}>
          <div className="inputGroup">
            <input
              className="input"
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </div>
          <div className="inputGroup">
            <input
              className="input"
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button className="authBtn" type="submit">
            Sign Up
          </button>
        </form>
        <p className="paragraph">
          Already have an account?{' '}
          <Link to="/login" className="link">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default SignUpPage;