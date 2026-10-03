const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/userModel');

const generateToken = (_id) => {
  return jwt.sign({ _id }, process.env.SECRET, { expiresIn: '3d' });
};

const signupUser = async (req, res, next) => {
  try {
    const { fullName, email, password, phoneNumber, gender, date_of_birth, accountType } = req.body;

    if (!fullName || !email || !password || !phoneNumber || !gender || !date_of_birth || !accountType) {
      return res.status(400).json({ error: 'Please add all fields' });
    }

    const existingUser = await User.findOne({ email });
    if (existingUser) {
      return res.status(400).json({ error: 'User already exists' });
    }

    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const user = await User.create({
      fullName,
      email,
      password: hashedPassword,
      phoneNumber,
      gender,
      date_of_birth,
      accountType,
    });

    const token = generateToken(user._id);

    res.status(201).json({ email: user.email, token });
  } catch (error) {
    next(error);
  }
};

const loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email });
    if (!user) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      return res.status(400).json({ error: 'Invalid credentials' });
    }

    const token = generateToken(user._id);

    res.status(200).json({ email: user.email, token });
  } catch (error) {
    next(error);
  }
};

module.exports = { signupUser, loginUser };