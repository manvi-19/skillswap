const express = require('express');
const router = express.Router();
const User = require('../models/User');

const bcrypt = require('bcryptjs'); // For hashing passwords (optional for now)

const jwt = require('jsonwebtoken');

const protect = require('../middleware/authMiddleware');

// Protected Route Example
router.get('/profile', protect, async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select('-password'); // Exclude password
    res.json(user);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// User Login with JWT
router.post('/login', async (req, res) => {
  const { email, password } = req.body;
  try {
    const user = await User.findOne({ email });
    if (!user) {
      return res.status(404).json({ message: 'User not found!' });
    }

    // Compare the password
    if (user.password !== password) {
      return res.status(401).json({ message: 'Invalid credentials!' });
    }

    // Generate JWT token
    const token = jwt.sign({ id: user._id }, 'manu', { expiresIn: '1h' });

    res.json({ message: 'Login successful!', token });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Create a new user
router.post('/register', async (req, res) => {
  const { name, email, password, skillsOffered, skillsWanted } = req.body;
  try {
    const newUser = new User({ name, email, password, skillsOffered, skillsWanted });
    await newUser.save();
    res.status(201).json({ message: 'User registered successfully!' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});


// Get all users
router.get('/', async (req, res) => {
  try {
    const users = await User.find();
    res.json(users);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
});

router.get("/matches", protect, async (req, res) => {
  const user = await User.findById(req.user._id);

  const matches = await User.find({
    skillsOffered: { $in: user.skillsWanted },
    skillsWanted: { $in: user.skillsOffered },
    _id: { $ne: user._id },
  });

  res.json(matches);
});


module.exports = router;
