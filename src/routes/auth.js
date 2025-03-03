const express = require('express');
const Joi = require('joi');
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/Users');
require('dotenv').config();
const auth = require('../middleware/auth');

const router = express.Router();

const userSchema = Joi.object({
  name: Joi.string().required(),
  email: Joi.string().email().required(),
  password: Joi.string().min(6).required(),
});

// REGISTER
router.post('/register', async (req, res) => {
  const { error } = userSchema.validate(req.body);
  if (error) return res.status(400).json({ message: error.details[0].message });

  const { name, email, password } = req.body;
  const existingUser = await User.findOne({ email });
  if (existingUser) return res.status(409).json({ message: 'Email in use' });

  const user = new User({ name, email, password });

  try {
    const token = user.generateAuthToken();
    user.token = token;
    await user.save();

    res.status(201).json({
      token,
      user: { name: user.name, email: user.email },
    });
  } catch (err) {
    res.status(500).json({ message: 'Error creating user', err });
  }
});

// LOGIN
router.post('/login', async (req, res) => {
  const { email, password } = req.body;

  const user = await User.findOne({ email });
  if (!user) return res.status(401).json({ message: 'Invalid email or password' });

  const isMatch = await bcrypt.compare(password, user.password);
  if (!isMatch) return res.status(401).json({ message: 'Invalid email or password' });

  const token = user.generateAuthToken();
  user.token = token;
  await user.save();

  res.status(200).json({
    token,
    user: { name: user.name, email: user.email },
  });
});

// LOGOUT
router.get('/logout', auth, async (req, res) => {
  req.user.token = null;
  await req.user.save();
  res.status(204).send();
});

module.exports = router;
