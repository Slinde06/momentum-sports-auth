import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import './Signup.css';

// Base URL for all authentication API calls
const API = 'http://localhost:5000/api/auth';

function Register() {
  // Local state for each form field
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');

  // State for showing a success message after registration
  const [message, setMessage] = useState('');

  // State for showing error messages if registration fails
  const [error, setError]     = useState('');

  // State to track whether a registration request is in progress
  const [loading, setLoading] = useState(false);

  // Hook to programmatically redirect the user after successful registration
  const navigate = useNavigate();

  // Handles form submission when the user clicks "Register"
  const handleRegister = async (e) => {
    e.preventDefault(); // Prevent default browser form submission (page reload)

    // Basic client-side validation before hitting the API
    if (!username || !email || !password) {
      return setError('Please fill in all fields');
    }

    setError('');    // Clear any previous error messages
    setMessage('');  // Clear any previous success messages
    setLoading(true); // Show loading state on the button

    try {
      // Send registration data to the backend
      // Note: the API expects "name", so username is sent as the name field
      const res = await axios.post(`${API}/register`, {
        email,
        password,
        name: username,
      });

      // Display the success message returned from the server
      setMessage(res.data.message);

      // Automatically redirect to the login page after 1.5 seconds
      setTimeout(() => navigate('/login'), 1500);

    } catch (err) {
      // Display the error message from the server, or a generic fallback
      setError(err.response?.data?.message || 'Something went wrong');
    }

    setLoading(false); // Re-enable the form after the request completes
  };

  return (
    <>
      <div className='login-page'>
        <div className='login-card'>
          <div className='login-header'>
            <h1>Register</h1>
            <p>Create your account</p>
          </div>

          {/* Registration form — calls handleRegister on submission */}
          <form className='login-form' onSubmit={handleRegister}>

            {/* Username field — sent to the API as the "name" field */}
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
              {loading ? 'Registering...' : 'Register'}
            </button>

            {/* Navigate back to the login page */}
            <button
              type='button'
              className='login-btn secondary'
              onClick={() => navigate('/login')}
              disabled={loading}
            >
              Back to Login
            </button>
          </form>

          {/* Display error message if registration fails */}
          {error && <p className='error'>{error}</p>}

          {/* Display success message if registration succeeds */}
          {message && <p className='success'>{message}</p>}
        </div>
      </div>
    </>
  );
}

export default Register;