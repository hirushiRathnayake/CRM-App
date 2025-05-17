const express = require('express');
const cors = require('cors');
const dotenv = require('dotenv');
const connectDB = require('./config/db');
const bodyParser = require('body-parser');

const customerRoutes = require('./routes/customerRoutes');
const authRoutes = require('./routes/authRoutes');
const dashboardRoutes = require('./routes/dashboardRoutes');

dotenv.config();
const app = express();
connectDB();

app.use(cors());
app.use(express.json());
app.use(bodyParser.json());


app.use('/api/customers', customerRoutes);


app.use('/api/auth', authRoutes);

app.use('/api/dashboard', dashboardRoutes);

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));
