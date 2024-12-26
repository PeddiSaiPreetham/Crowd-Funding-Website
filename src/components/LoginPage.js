// src/components/LoginPage.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { loginUser } from '../services/authService';
import axios from 'axios';
const LoginPage = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // const handleLogin = async (e) => {
  //   e.preventDefault();
  //   setError('');
  //   try {
  //     const response = await axios.post('http://localhost:5000/api/users/login', {
  //       email,
  //       password,
  //     });
  
  //     // Log the response to check the token
  //     console.log('Login Response:', response);
  //     localStorage.setItem('authToken', response.data.token);
  //     // Ensure you are setting the token correctly
  //     navigate('/');
  //   } catch (error) {
  //     console.error('Error logging in:', error);
  //   }
  // };
  // src/pages/LoginPage.js

const handleLogin = async (e) => {
  e.preventDefault();
  setError('');
  try {
    const response = await axios.post('http://localhost:5000/api/users/login', {
      email,
      password,
    });

    if (response.data) {
      console.log("Logged in");
      localStorage.setItem('userEmail', email); // Store email instead of token
      
      navigate('/'); // Redirect to homepage
    } else {
      console.error('Login failed');
    }
  } catch (error) {
    console.error('Error logging in:', error);
  }
};

  return (
    <div className="login-container">
      <h1>Login</h1>
      {error && <p className="error-message">{error}</p>}
      <form onSubmit={handleLogin}>
        <div>
          <label>Email:</label>
          <input type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
        </div>
        <div>
          <label>Password:</label>
          <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
        </div>
        <button type="submit">Login</button>
      </form>
      <p>Don't have an account? <a href="/signup">Sign Up</a></p>
    </div>
  );
};

export default LoginPage;
