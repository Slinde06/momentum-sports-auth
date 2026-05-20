import React, { useState } from 'react';
import './LoginPage.css';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail]       = useState('');
  const [password, setPassword] = useState('');
  const [error, setError]       = useState('');
  const [loading, setLoading]   = useState(false);

  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      return setError('Please fill in all fields.');
    }

    setError('');
    setLoading(true);

    try {
      const res = await axios.post(`${API}/auth/login`, {
        username,
        email,
        password,
      });
      localStorage.setItem("token", res.data.token);
      localStorage.setItem("userEmail", email);
      alert('Login Successful');
      navigate("/"); // redirect to Home after login
    } catch (err) {
      setError(err.response?.data?.message || "Invalid credentials");
    }

    setLoading(false);
  };

  const handleSignupRedirect = () => {
    navigate('/signup');
  };

  return (
  <div className="login-page">
    <div className="login-card">
      <div className="login-header">
        <h1>Login</h1>
        <p>Welcome back</p>
      </div>

      <form className="login-form" onSubmit={handleSubmit}>
        <div className="login-field">
          <label htmlFor="username">Username</label>
          <input
            id="username"
            type="text"
            placeholder="Enter username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="login-field">
          <label htmlFor="email">Email</label>
          <input
            id="email"
            type="email"
            placeholder="Enter email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={loading}
          />
        </div>

        <div className="login-field">
          <label htmlFor="password">Password</label>
          <input
            id="password"
            type="password"
            placeholder="Enter password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            disabled={loading}
          />
        </div>

        <button type="submit" className="login-btn" disabled={loading}>
          {loading ? "Logging in..." : "Enter"}
        </button>

        <button
          type="button"
          className="login-btn secondary"
          onClick={handleSignupRedirect}
          disabled={loading}
        >
          Sign Up
        </button>
      </form>

      {error && <p className="error">{error}</p>}
    </div>
  </div>
);
}

export default LoginPage;
