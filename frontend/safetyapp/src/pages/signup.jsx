import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import '../styles/SignUp.css';

const SignUp = () => {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccessMessage('');

    try {
      const response = await axios.post('http://127.0.0.1:8000/api/signup/', {
        username,
        email,
        password,
        confirm_password: confirmPassword,
      });

      setSuccessMessage(response.data.message);  // Show success message
      setTimeout(() => navigate('/login'), 2000);  // Redirect to login after 2 seconds
    } catch (err) {
      if (err.response && err.response.data) {
        // Extract and display specific validation errors from the backend
        const errorMessages = Object.values(err.response.data).flat().join(' ');
        setError(errorMessages);
      } else {
        setError('An error occurred. Please try again.');
      }
    }
  };

  return (
    <div className="signup-container">
      <h2>Sign Up</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label>Username:</label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Email:</label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Password:</label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>
        <div className="form-group">
          <label>Confirm Password:</label>
          <input
            type="password"
            value={confirmPassword}
            onChange={(e) => setConfirmPassword(e.target.value)}
            required
          />
        </div>
        {error && <p className="error-message">{error}</p>}
        {successMessage && <p className="success-message">{successMessage}</p>}
        <button type="submit" className="signup-button">Sign Up</button>
      </form>
      <p className="login-link">Already have an account? <a href="/login">Login</a></p>
    </div>
  );
};

export default SignUp;
