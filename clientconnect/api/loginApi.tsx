// src/api/loginApi.ts
import axios from 'axios';

const BASE_URL = 'http://192.168.0.100:5000/api/auth'; // Adjust if backend URL differs

export const loginUserApi = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${BASE_URL}/login`, data);
  return response.data; // return user data from backend
  console.log(response.data); // Log the response data
};

export const registerUserApi = async (data: { email: string; password: string }) => {
  const response = await axios.post(`${BASE_URL}/register`, data);
  return response.data;
};
