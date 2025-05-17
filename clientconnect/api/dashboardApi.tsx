import axios from 'axios';
const BASE_URL = 'http://192.168.0.100:5000/api/customers'; 

export const fetchDashboardSummaryAPI = async () => {
  const res = await axios.get(`${BASE_URL}/dashboard/summary`);
  return res.data;
};
