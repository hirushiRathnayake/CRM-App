import axios from 'axios';
const BASE_URL = 'http://192.168.0.100:5000/api/dashboard'; // Replace with ngrok if on physical device

export const fetchDashboardSummaryAPI = async () => {
  const res = await axios.get(`${BASE_URL}/summary`);
  return res.data;
};
