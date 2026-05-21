import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";
import './Signup.css';

const API = 'http://localhost:5000/api/auth';





function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    e.preventDefault();
    if (!username || !email || !password) {
      return setError("Please fill in all fields");
    }
    setError("");
    setMessage("");
    setLoading(true);
    try {
      const res = await axios.post(`${API}/register`, {
        email,
        password,
        name: username,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }
    setLoading(false);
  };

  const handleLoginRedirect = () => {
    navigate('/login');
  };

  return (
    <div className="login-page">
      <div className="login-card">
        <div className="login-header">
          <h1>Register</h1>
          <p>Create your account</p>
        </div>
        <form className="login-form" onSubmit={handleRegister}>
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
            {loading ? "Registering..." : "Register"}
          </button>
          <button
            type="button"
            className="login-btn secondary"
            onClick={handleLoginRedirect}
            disabled={loading}
          >
            Back to Login
          </button>
        </form>
        {error && <p className="error">{error}</p>}
        {message && <p className="success">{message}</p>}
      </div>
    </div>
  );
}

export default Register;
