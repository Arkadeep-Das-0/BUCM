const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../Models/userSchema');
const Clubs = require('../Models/club');
const authenticate = require('../Middleware/authenticate');

// Registration route
router.post('/register', async (req, res) => {
  const { name, gsuit, password, confirm_password } = req.body;

  if (!name || !gsuit || !password || !confirm_password) {
    return res.status(422).json({ error: 'Please fill all fields' });
  }

  try {
    const userExist = await User.findOne({ gsuit: gsuit });

    if (userExist) {
      return res.status(422).json({ error: 'Email already exists' });
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = new User({
      name: name,
      gsuit: gsuit,
      password: hashedPassword,
      confirm_password: hashedPassword,
    });

    const userRegister = await user.save();

    if (userRegister) {
      res.status(201).json({ message: 'Registration successful' });
    }
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});

// Login Route
router.post('/login', async (req, res) => {
  const { gsuit, password } = req.body;

  try {
    // Check if the required fields are present
    if (!gsuit || !password) {
      return res.status(400).json({ error: 'Please provide gsuit and password' });
    }

    // Check if the user exists in the database
    const user = await User.findOne({ gsuit });

    if (!user) {
      return res.status(404).json({ error: 'User not found' });
    }

    // Check if the password is correct
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    // Generate a token and store it in the user object
    const token = jwt.sign({ id: user._id }, process.env.SECRET_KEY, {
      expiresIn: '1h',
    });

    user.token = token;
    await user.save();

    // Store the token in a cookie only if login was successful
    res.cookie('token', token, { httpOnly: true });

    // Redirect to home page with success message
    res.status(200).json({ message: 'Login successful!' });
  } catch (err) {
    console.log(err);
    res.status(500).json({ error: 'Server error' });
  }
});


module.exports = router;
