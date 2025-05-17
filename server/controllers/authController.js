import User from '../models/users'
import jwt from 'jsonwebtoken';

// Generate JWT
const generateToken = (userId) => {
  return jwt.sign({ id: userId }, process.env.JWT_SECRET, { expiresIn: '7d' });
};

// @desc    Login user
// @route   POST /api/auth/login
export const loginUser = async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
      return res.status(401).json({ message: 'Invalid email or password' });
    }

    res.json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Server error' });
  }
};

// @desc    Register user
// @route   POST /api/auth/register
export const registerUser = async (req, res) => {
  const { email, password, name } = req.body;

  try {
    const existingUser = await User.findOne({ email });
    if (existingUser)
      return res.status(400).json({ message: 'Email already registered' });

    const user = new User({ email, password, name });
    await user.save();

    res.status(201).json({
      user: {
        _id: user._id,
        email: user.email,
        name: user.name,
      },
      token: generateToken(user._id),
    });
  } catch (err) {
    res.status(500).json({ message: 'Registration failed' });
  }
};
