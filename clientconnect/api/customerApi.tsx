// Simulated API call for customers (replace with real API call)
export interface Opportunity {
  id: string;
  name: string;
  status: 'New' | 'Closed Won' | 'Closed Lost';
}

export interface Customer {
  id: string;
  name: string;
  status: 'Active' | 'Inactive' | 'Lead';
  contact: string;
  picture?: string;
  opportunities?: Opportunity[];
}

let mockCustomers: Customer[] = [
  {
    id: '1',
    name: 'Alice Johnson',
    status: 'Active',
    contact: 'alice@example.com',
    picture: 'https://randomuser.me/api/portraits/women/1.jpg',
    opportunities: [
      { id: 'op1', name: 'Website Redesign', status: 'New' },
    ],
  },
  {
    id: '2',
    name: 'Bob Smith',
    status: 'Lead',
    contact: 'bob@example.com',
    picture: 'https://randomuser.me/api/portraits/men/2.jpg',
    opportunities: [],
  },
  {
    id: '3',
    name: 'Carol White',
    status: 'Inactive',
    contact: 'carol@example.com',
    picture: 'https://randomuser.me/api/portraits/women/3.jpg',
    opportunities: [
      { id: 'op2', name: 'Consultation Service', status: 'Closed Lost' },
    ],
  },
];

// Simulate delay
const simulateDelay = (ms: number) =>
  new Promise((resolve) => setTimeout(resolve, ms));

// ✅ Fetch all customers
export const fetchCustomersAPI = async (): Promise<Customer[]> => {
  await simulateDelay(1000);
  return mockCustomers;
};

// ✅ Fetch customer by ID
export const fetchCustomerByIdAPI = async (id: string): Promise<Customer> => {
  await simulateDelay(500);
  const customer = mockCustomers.find((c) => c.id === id);
  if (!customer) throw new Error('Customer not found');
  return customer;
};

// ✅ Update customer status
export const updateCustomerStatusAPI = async (
  id: string,
  status: 'Active' | 'Inactive' | 'Lead'
): Promise<Customer> => {
  await simulateDelay(500);
  const customer = mockCustomers.find((c) => c.id === id);
  if (!customer) throw new Error('Customer not found');
  customer.status = status;
  return customer;
};

// ✅ Add opportunity to customer
export const addOpportunityAPI = async (
  customerId: string,
  opportunity: { name: string; status: 'New' | 'Closed Won' | 'Closed Lost' }
): Promise<Opportunity> => {
  await simulateDelay(500);
  const customer = mockCustomers.find((c) => c.id === customerId);
  if (!customer) throw new Error('Customer not found');

  const newOpportunity: Opportunity = {
    id: `op_${Date.now()}`,
    ...opportunity,
  };

  if (!customer.opportunities) customer.opportunities = [];
  customer.opportunities.push(newOpportunity);
  return newOpportunity;
};
