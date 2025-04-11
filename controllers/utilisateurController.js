const Utilisateur = require('../models/Utilisateur');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const nodemailer = require('nodemailer'); // Add nodemailer for sending emails
const crypto = require('crypto'); // Add crypto for decryption

// Create a new user
const createUser = async (req, res) => {
  try {
    const hashedAttributes = {};
    for (const key in req.body) {
      if (key !== 'role') {
        hashedAttributes[key] = await bcrypt.hash(req.body[key], 10);
      } else {
        hashedAttributes[key] = req.body[key];
      }
    }
    const user = new Utilisateur(hashedAttributes);
    await user.save();
    res.status(201).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Get all users
const getUsers = async (req, res) => {
  try {
    const users = await Utilisateur.find();
    res.status(200).send(users);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Get a user by ID
const getUserById = async (req, res) => {
  try {
    const user = await Utilisateur.findById(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Update a user by ID
const updateUser = async (req, res) => {
  try {
    const user = await Utilisateur.findByIdAndUpdate(req.params.id, req.body, { new: true, runValidators: true });
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(400).send(error);
  }
};

// Delete a user by ID
const deleteUser = async (req, res) => {
  try {
    const user = await Utilisateur.findByIdAndDelete(req.params.id);
    if (!user) {
      return res.status(404).send();
    }
    res.status(200).send(user);
  } catch (error) {
    res.status(500).send(error);
  }
};

// Generate a 6-digit random code
const generateCode = () => {
  return Math.floor(100000 + Math.random() * 900000).toString();
};

// Send email with the 6-digit code
const sendEmail = async (email, code) => {
  let transporter = nodemailer.createTransport({
    host: 'smtp.gmail.com', // Update host
    port: 465, // Use port 465 for secure connection
    secure: true, // Use true for 465, false for other ports
    auth: {
      user: process.env.EMAIL_USER,
      pass: process.env.EMAIL_PASS
    },
    tls: {
      rejectUnauthorized: false // Add this to prevent unauthorized errors
    }
  });

  let mailOptions = {
    from: process.env.EMAIL_USER,
    to: email,
    subject: 'Your verification code',
    text: `Your verification code is ${code}`
  };

  await transporter.sendMail(mailOptions);
};

// Ensure that the email credentials are correct.
// If using a Gmail account, you might need to enable access for less secure apps:
// https://myaccount.google.com/lesssecureapps
// If 2-Step Verification is enabled, generate an App Password and use it instead of your regular password:
// https://support.google.com/accounts/answer/185833

// Login a user
const loginUser = async (req, res) => {
  try {
    const { email, motDePasse } = req.body;
    const users = await Utilisateur.find();
    let user = null;
    for (const u of users) {
      const isEmailMatch = await bcrypt.compare(email, u.email);
      if (isEmailMatch) {
        user = u;
        break;
      }
    }
    if (!user) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }
    const isPasswordMatch = await bcrypt.compare(motDePasse, user.motDePasse);
    if (!isPasswordMatch) {
      return res.status(400).send({ message: 'Invalid email or password' });
    }

    // Generate and send the 6-digit code
    const code = generateCode();
    user.verificationCode = code;
    
    await sendEmail(email, code);
    await user.save();

    res.cookie('userSession', JSON.stringify({ email }), { httpOnly: true });
    res.status(200).send({ message: 'Verification code sent to your email' });
  } catch (error) {
    res.status(500).send(error);
  }
};

// Verify the 6-digit code and complete login
const verifyCode = async (req, res) => {
  try {
    const { email, code } = req.body;
    const users = await Utilisateur.find();
    let user = null;
    for (const u of users) {
      const isEmailMatch = await bcrypt.compare(email, u.email);
      if (isEmailMatch) {
        user = u;
        break;
      }
    }
    if (!user || user.verificationCode !== code) {
      return res.status(400).send({ message: 'Invalid verification code' });
    }

    // Clear the verification code and generate JWT token
    user.verificationCode = null;
    const token = jwt.sign({ _id: user._id }, process.env.JWT_SECRET, { expiresIn: '1h' });
    user.token = token;
    await user.save();

    res.cookie('userSession', JSON.stringify(user), { httpOnly: true });
    res.status(200).send({ user }); // Send user data along with the token
  } catch (error) {
    res.status(500).send(error);
  }
};

// Logout a user
const logoutUser = async (req, res) => {
  try {
    const user = await Utilisateur.findById(req.body._id);
    if (!user) {
      return res.status(404).send();
    }
    user.token = null;
    await user.save();
    res.clearCookie('userSession');
    res.status(200).send({ message: 'Logged out successfully' });
  } catch (error) {
    res.status(500).send(error);
  }
};

module.exports = {
  createUser,
  getUsers,
  getUserById,
  updateUser,
  deleteUser,
  loginUser,
  logoutUser,
  verifyCode // Export the new verifyCode function
};
