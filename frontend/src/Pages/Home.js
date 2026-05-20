import React, { useState } from 'react';
import { Routes, Route, useNavigate } from "react-router-dom";
import axios from "axios";

import Home from '../Pages/Home';
import LoginPage from '../Pages/LoginPage';
import Signup from '../Pages/Signup';

function Register() {
  const [username, setUsername] = useState("");
  const [email, setEmail]       = useState("");
  const [password, setPassword] = useState("");
  
  const [message, setMessage]   = useState("");
  const [error, setError]       = useState("");
  const [loading, setLoading]   = useState(false);
  
  const navigate = useNavigate();

  const handleRegister = async () => {
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
}


function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
