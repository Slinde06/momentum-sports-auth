import React, { useState } from 'react';
import { useNavigate } from "react-router-dom";
import axios from "axios";

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  
  const [message, setMessage]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async () => {
    if (!username || !email || !password) {
      return setError("Please fill in all fields");
    }

    setError(""); 
    setMessage(""); 
    setLoading(true);

    try {
      const res = await axios.post(`${API}/auth/register`, {
        email,
        password,
        username,
      });
      setMessage(res.data.message);
      setTimeout(() => navigate("/login"), 1500);
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
    }

    setLoading(false);
  };

return (
  <div className="auth-card">
    <h2>Register</h2>
    <form onSubmit={handleRegister}>
      <div className="auth-field">
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

      <div className="auth-field">
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

      <div className="auth-field">
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

      <button type="submit" disabled={loading}>
        {loading ? "Registering..." : "Register"}
      </button>
    </form>

    {error && <p className="error">{error}</p>}
    {message && <p className="success">{message}</p>}
  </div>
);
}

export default Register;
