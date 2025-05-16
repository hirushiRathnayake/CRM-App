// models/Customer.js
const mongoose = require('mongoose');
const { v4: uuidv4 } = require('uuid');

const opportunitySchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  status: {
    type: String,
    enum: ['New', 'Closed Won', 'Closed Lost'],
    default: 'New',
  },
});

const customerSchema = new mongoose.Schema({
  id: {
    type: String,
    default: uuidv4,
    unique: true,
  },
  name: {
    type: String,
    required: true,
  },
  contact: {
    type: String,
    required: true,
  },
  picture: {
    type: String,
    default: '',
  },
  status: {
    type: String,
    enum: ['Active', 'Inactive', 'Lead'],
    default: 'Lead',
  },
  opportunities: [opportunitySchema],
});

module.exports = mongoose.model('Customer', customerSchema);
