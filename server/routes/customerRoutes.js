const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const mongoose = require('mongoose');


// ✅ GET all customers
router.get('/', async (req, res) => {
  try {
    const customers = await Customer.find();
    res.json(customers);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ GET customer by ID
router.get('/:id', async (req, res) => {
  try {
    if (!mongoose.Types.ObjectId.isValid(req.params.id)) {
      return res.status(400).json({ error: 'Invalid ID format' });
    }

    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST new customer
router.post('/', async (req, res) => {
  const { name, contact, status, picture } = req.body;
  try {
    const newCustomer = new Customer({ name, contact, status, picture });
    await newCustomer.save();
    res.status(201).json(newCustomer);
  } catch (err) {
    res.status(400).json({ error: err.message });
  }
});

// ✅ PUT update customer status
router.put('/:id/status', async (req, res) => {
  const { status } = req.body;
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });
    customer.status = status;
    await customer.save();
    res.json(customer);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

// ✅ POST new opportunity
router.post('/:id/opportunities', async (req, res) => {
  const { name, status } = req.body;
  try {
    const customer = await Customer.findById(req.params.id);
    if (!customer) return res.status(404).json({ error: 'Customer not found' });

    const opportunity = { name, status };
    customer.opportunities.push(opportunity);
    await customer.save();

    res.status(201).json(opportunity);
  } catch (err) {
    res.status(500).json({ error: 'Server error' });
  }
});

module.exports = router;
