const Customer = require('../models/Customer');

// Fetch dashboard summary data
const getDashboardSummary = async (req, res) => {
  try {
    const customers = await Customer.find();

    const totalCustomers = customers.length;
    const activeCustomers = customers.filter(c => c.status === 'Active').length;
    const inactiveCustomers = customers.filter(c => c.status === 'Inactive').length;
    const leadCustomers = customers.filter(c => c.status === 'Lead').length;

    // Flatten all opportunities from customers
    const allOpportunities = customers.reduce((acc, customer) => {
      return acc.concat(customer.opportunities);
    }, []);

    const totalOpportunities = allOpportunities.length;
    const newOpportunities = allOpportunities.filter(o => o.status === 'New').length;
    const closedWonOpportunities = allOpportunities.filter(o => o.status === 'Closed Won').length;
    const closedLostOpportunities = allOpportunities.filter(o => o.status === 'Closed Lost').length;

    res.json({
      totalCustomers,
      activeCustomers,
      inactiveCustomers,
      leadCustomers,
      totalOpportunities,
      newOpportunities,
      closedWonOpportunities,
      closedLostOpportunities,
    });
  } catch (error) {
    console.error('Dashboard summary error:', error);
    res.status(500).json({ error: 'Server error' });
  }
};

module.exports = { getDashboardSummary };
