import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/Login.css';
import { ACCESS_TOKEN, REFRESH_TOKEN } from '../constants.jsx';

const Login = ({ onLogin }) => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    try {
      // Send login request to Django backend
      const response = await axios.post('http://127.0.0.1:8000/api/token/', {
        username,
        password
      });
      // Get token from response and save it to local storage
      const { access, refresh } = response.data;
      localStorage.setItem(ACCESS_TOKEN, access);
      localStorage.setItem(REFRESH_TOKEN, refresh);

      // Notify the parent component about login status
      onLogin(username);  // Now using the state variable 'username'

      // Redirect to the home page after successful login
      navigate('/');
    } catch (err) {
      if (err.response && err.response.data) {
        setError('Invalid username or password.');
      } else {
        console.error(err);
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className='center'>
      <div className="login-container">
        <h2>Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Username:</label>
            <input
              type="text"
              value={username}
              onChange={(e) => setUsername(e.target.value)}  // Update state with input value
              required
            />
          </div>
          <div className="form-group">
            <label>Password:</label>
            <input
              type="password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}  // Update state with input value
              required
            />
          </div>
          {error && <p className="error-message">{error}</p>}
          <button type="submit" className="login-button">Login</button>
        </form>
        <p className="signup-link">Don't have an account? <a href="/signup">Sign up</a></p>
      </div>
    </div>
  );
};

export default Login;
