import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Template from './components/Template';
import authService from './services/authService';

function App() {
  const [token, setToken] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (token) {
      setToken(token);
    }
  }, []);

  const logout = () => {
    authService.logout();
    setToken(null);
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? <Template token={token} logout={logout} /> : <Navigate to="/login" />}
        />
        <Route path="/login" element={<Login setToken={setToken} />} />
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
