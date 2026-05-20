import React, { useState } from 'react';
import './LoginPage.css';


function LoginPage() {
  const [username, setUsername] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!username || !email || !password) {
      alert('Please fill in all fields.');
      return;
    }

    console.log('Logging in:', {
      username,
      email,
      password,
    });

    alert('Login Successful');
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
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Email</label>
            <input
              type="email"
              placeholder="Enter email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </div>

          <div className="login-field">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>

          <button type="submit" className="login-btn">
            Enter
          </button>
        </form>

        <p className="login-or">Or login using</p>

        <div className="login-socials">
          <button className="social-btn facebook">F</button>
          <button className="social-btn google">G</button>
          <button className="social-btn twitter">X</button>
        </div>
      </div>
    </div>
  );
}

export default LoginPage;