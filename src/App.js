import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, Navigate } from 'react-router-dom';
import Login from './components/Login';
import Register from './components/Register';
import Template from './components/Template';
import authService from './services/authService';

function App() {
  const [token, setToken] = useState(null);
  const [email, setEmail] = useState(null);  // Kullanıcı email bilgisini tutmak için state

  useEffect(() => {
    // Token ve email'i localStorage'dan alıyoruz
    const storedToken = localStorage.getItem('token');
    const storedEmail = localStorage.getItem('email');  // Email bilgisini localStorage'dan alıyoruz

    if (storedToken) {
      setToken(storedToken);
    }
    if (storedEmail) {
      setEmail(storedEmail);
    }
  }, []);

  const logout = () => {
    authService.logout();
    setToken(null);
    setEmail(null);  // Logout işlemi sırasında email'i de sıfırlıyoruz
    localStorage.removeItem('token');
    localStorage.removeItem('email');  // Email'i localStorage'dan siliyoruz
  };

  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={token ? (
            <Template token={token} email={email} logout={logout} />  // Email'i Template'e prop olarak geçiriyoruz
          ) : (
            <Navigate to="/login" />
          )}
        />
        <Route path="/login" element={<Login setToken={setToken} setEmail={setEmail} />} />  {/* setEmail'i de Login'e geçiriyoruz */}
        <Route path="/register" element={<Register />} />
      </Routes>
    </Router>
  );
}

export default App;
