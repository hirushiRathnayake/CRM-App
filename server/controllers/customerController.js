const Customer = require('../models/Customer');
const mongoose = require('mongoose');


// Get all customers
exports.getAllCustomers = async (req, res) => {
  const customers = await Customer.find();
  res.json(customers);
};

// Get one customer
exports.getCustomerById = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ error: 'Not found' });
  res.json(customer);
};

// Create customer
exports.createCustomer = async (req, res) => {
  const customer = await Customer.create(req.body);
  res.status(201).json(customer);
};

// Update status
exports.updateCustomerStatus = async (req, res) => {
  const customer = await Customer.findByIdAndUpdate(
    req.params.id,
    { status: req.body.status },
    { new: true }
  );
  res.json(customer);
};

// Add opportunity
exports.addOpportunity = async (req, res) => {
  const customer = await Customer.findById(req.params.id);
  if (!customer) return res.status(404).json({ error: 'Not found' });

  customer.opportunities.push(req.body);
  await customer.save();
  res.status(201).json(req.body);
};
