const User = require('../models/users');
const jwt = require('jsonwebtoken');

const JWT_SECRET = process.env.JWT_SECRET || 'your_jwt_secret_here';

exports.register = async (req, res) => {
  const { username, fullName, email, phone, password } = req.body;

  try {
    // Check if user or email already exists
    if (await User.findOne({ username })) {
      return res.status(400).json({ message: 'Username already taken' });
    }
    if (await User.findOne({ email })) {
      return res.status(400).json({ message: 'Email already registered' });
    }

    const newUser = new User({ username, fullName, email, phone, password });
    await newUser.save();

    res.status(201).json({ 
      message: 'User registered successfully', 
      user: { username: newUser.username, email: newUser.email }
    });
  } catch (error) {
    console.error('Register error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};

exports.login = async (req, res) => {
  const { email, password } = req.body;

  try {
    const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: 'Invalid credentials' });

    const isMatch = await user.comparePassword(password);
    if (!isMatch) return res.status(400).json({ message: 'Invalid credentials' });

    const payload = { userId: user._id, username: user.username };
    const token = jwt.sign(payload, JWT_SECRET, { expiresIn: '1h' });

    res.json({ 
      token,
      user: {
        username: user.username,
        email: user.email,
        fullName: user.fullName,
        phone: user.phone,
      }
    });
  } catch (error) {
    console.error('Login error:', error);
    res.status(500).json({ message: 'Server error' });
  }
};
