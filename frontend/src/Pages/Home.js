
import React from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import LoginPage from '../Pages/LoginPage';
import Signup from '../Pages/Signup';



function App() {
  return (
    <Routes>
      <Route path="/" element={<Navigate to="/login" replace />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/signup" element={<Signup />} />
    </Routes>
  );
}

export default App;
