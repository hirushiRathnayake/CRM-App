const express = require('express');
const router = express.Router();
const Customer = require('../models/Customer');
const mongoose = require('mongoose');
// const mongoose = require('mongoose');



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
  try {
    const id = req.params.id;           // This is the MongoDB _id as a string
    const { status } = req.body;

    // Validate id format first (optional but recommended)
    if (!mongoose.Types.ObjectId.isValid(id)) {
      return res.status(400).json({ message: 'Invalid ID format' });
    }

    // Find by MongoDB _id (ObjectId), convert string id to ObjectId
    const updatedCustomer = await Customer.findByIdAndUpdate(
      id,
      { status },
      { new: true }
    );

    if (!updatedCustomer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    res.json(updatedCustomer);
  } catch (error) {
    console.error('Error updating customer status:', error);
    res.status(500).json({ message: 'Server error' });
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

// Assuming you use Mongoose and have a Customer model

router.put('/:id/opportunities/:opportunityId', async (req, res) => {
  const { id: customerId, opportunityId } = req.params;
  const { name, status } = req.body;

  try {
    const customer = await Customer.findById(customerId);
    if (!customer) {
      return res.status(404).json({ message: 'Customer not found' });
    }

    const opportunity = customer.opportunities.id(opportunityId);
    if (!opportunity) {
      return res.status(404).json({ message: 'Opportunity not found' });
    }

    if (name !== undefined) opportunity.name = name;
    if (status !== undefined) opportunity.status = status;

    await customer.save();
    res.json({ message: 'Opportunity updated successfully', opportunity });
  } catch (error) {
    console.error('Error updating opportunity:', error);
    res.status(500).json({ message: 'Server error' });
  }
});

module.exports = router;

