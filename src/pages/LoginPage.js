import React, { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom'; // Add Link here
import axios from 'axios';
import '../styles/LoginPage.css'; // Importing the CSS file

const LoginPage = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = async (e) => {
    e.preventDefault();//prevent page from reloading
    try {
      const response = await axios.post('http://localhost:5000/login', { email, password });
      if (response.data.message === 'Login successful') {
        localStorage.setItem('userId', response.data.userId); // Store user ID
        navigate('/taskmanager'); // Redirect to task manager page
      }
    } catch (err) {
      setError('Login failed. Please try again.');
    }
  };

  return (
    <div className="authContainer">
      <div className="authCard">
        <h1 className="heading">Login</h1>
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
            Login
          </button>
        </form>
        <p className="paragraph">
          Don't have an account?{' '}
          <Link to="/signup" className="link">
            Sign Up
          </Link>
        </p>
      </div>
    </div>
  );
};

export default LoginPage;