import axios from 'axios';

const BASE_URL = 'http://192.168.0.100:5000/api/customers'; // Replace with ngrok if on physical device

export const fetchCustomersAPI = async () => {
  const res = await axios.get(BASE_URL);
  return res.data;
  console.log(res.data);
};

export const fetchCustomerByIdAPI = async (id: string) => {
  console.log('API Request: Fetch customer by ID:', id); // ✅ Log
  const res = await axios.get(`${BASE_URL}/${id}`);
  return res.data;
};


export const updateCustomerStatusAPI = async (id: string, status: string) => {
     console.log('API Request: Fetch customer byghgh ID:', id);
  const res = await axios.put(`${BASE_URL}/${id}/status`, { status });
  return res.data;
};

export const addOpportunityAPI = async (
  customerId: string,
  opportunity: { name: string; status: string }
) => {
  const res = await axios.post(`${BASE_URL}/${customerId}/opportunities`, opportunity);
  return res.data;
};

export const updateOpportunityAPI = async (
  customerId: string,
  opportunityId: string,
  updatedOpportunity: { name: string; status: string }
) => {
  console.log('API Request: Update opportunity:', opportunityId);
  
  const res = await axios.put(
    `${BASE_URL}/${customerId}/opportunities/${opportunityId}`,
    updatedOpportunity
  );

  return res.data;
};

