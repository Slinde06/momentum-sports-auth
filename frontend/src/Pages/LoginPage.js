import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import Footer from '../components/Footer';

// Base URL for all authentication API calls
const API = 'http://localhost:5000/api/auth';

function LoginPage() {
  // Local state for each form field
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // State for displaying error messages to the user
  const [error, setError]     = useState('');

  // State to track whether a login request is in progress (disables form while loading)
  const [loading, setLoading] = useState(false);

  // Hook to programmatically navigate to a different route after login
  const navigate = useNavigate();

  // Handles form submission when the user clicks "Enter"
  const handleSubmit = async (e) => {
    e.preventDefault(); // Prevent default browser form submission (page reload)

    // Basic client-side validation before hitting the API
    if (!username || !email || !password) {
      return setError('Please fill in all fields.');
    }

    setError('');    // Clear any previous error messages
    setLoading(true); // Show loading state on the button

    try {
      // Send login credentials to the backend
      const res = await axios.post(`${API}/login`, { email, password });

      if (res.data?.token) {
        // Store the JWT token in localStorage so it can be sent with future requests
        localStorage.setItem('token', res.data.token);

        // Store the email for display or reference purposes
        localStorage.setItem('userEmail', email);

        alert('Login Successful');

        // Redirect to the home page after successful login
        navigate('/');
      } else {
        setError('Login failed: No token received');
      }
    } catch (err) {
      // Display the error message returned by the server, or a fallback message
      setError(err.response?.data?.message || 'Invalid credentials');
    }

    setLoading(false); // Re-enable the form after the request completes
  };

  return (
    <>
      <div className='login-page'>
        <div className='login-card'>
          <div className='login-header'>
            <h1>Login</h1>
            <p>Welcome back</p>
          </div>

          {/* Login form — calls handleSubmit on submission */}
          <form className='login-form' onSubmit={handleSubmit}>

            {/* Username field — currently collected but not sent to the API */}
            <div className='login-field'>
              <label htmlFor='username'>Username</label>
              <input
                id='username'
                type='text'
                placeholder='Enter username'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Email field */}
            <div className='login-field'>
              <label htmlFor='email'>Email</label>
              <input
                id='email'
                type='email'
                placeholder='Enter email'
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Password field */}
            <div className='login-field'>
              <label htmlFor='password'>Password</label>
              <input
                id='password'
                type='password'
                placeholder='Enter password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                disabled={loading}
              />
            </div>

            {/* Submit button — shows loading text while request is pending */}
            <button type='submit' className='login-btn' disabled={loading}>
              {loading ? 'Logging in...' : 'Enter'}
            </button>

            {/* Navigate to the signup page if the user doesn't have an account */}
            <button
              type='button'
              className='login-btn secondary'
              onClick={() => navigate('/signup')}
              disabled={loading}
            >
              Sign Up
            </button>
          </form>

          {/* Display error message if login fails */}
          {error && <p className='error'>{error}</p>}
        </div>
      </div>
    </>
  );
}

export default LoginPage;