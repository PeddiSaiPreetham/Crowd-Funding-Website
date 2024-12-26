// src/services/authService.js
import axios from 'axios';

const API_URL = 'http://localhost:5000/api/users';

export const loginUser = async (loginData) => {
  const response = await axios.post(`${API_URL}/login`, loginData);
  return response.data;
};

export const signupUser = async (signupData) => {
  const response = await axios.post(`${API_URL}/register`, signupData);
  return response.data;
};
