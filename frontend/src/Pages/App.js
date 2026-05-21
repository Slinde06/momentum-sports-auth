import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import HomePage from '../Pages/HomePage';
import LoginPage from '../Pages/LoginPage';
import Signup from '../Pages/Signup';

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

export default App;
