import axios from 'axios';

const AUTH_URL = 'http://localhost:3000/api/auth';

// Login: backend expects { credential, password }
export const loginApi = (credential, password) =>
  axios.post(`${AUTH_URL}/login`, { credential, password });

// Signup: backend expects { fullName, email, phone, password, role }
export const signupApi = (fullName, email, phone, password, role) =>
  axios.post(`${AUTH_URL}/signup`, { fullName, email, phone, password, role });
