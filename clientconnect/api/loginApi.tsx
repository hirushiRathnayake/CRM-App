import axios from 'axios';

const BASE_URL = 'http://192.168.0.100:5000/api'; // Change to your backend URL

// Login API
export const loginUserAPI = async (email: string, password: string) => {
  console.log('API Request: Login with email:', email);
  const res = await axios.post(`${BASE_URL}/auth/login`, { email, password });
  return res.data; // expected: { user: {...}, token: '...' }
};

// You can add more auth/user related APIs below, for example:

export const fetchUserProfileAPI = async (token: string) => {
  const res = await axios.get(`${BASE_URL}/auth/profile`, {
    headers: { Authorization: `Bearer ${token}` },
  });
  return res.data;
};

export const registerUserAPI = async (userData: { email: string; password: string; name: string }) => {
  const res = await axios.post(`${BASE_URL}/auth/register`, userData);
  return res.data;
};
