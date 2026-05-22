const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// Handler for POST /api/auth/register
// Creates a new user account with a hashed password
exports.register = async (req, res) => {
  try {
    // Destructure the expected fields from the request body
    const { name, email, password } = req.body;

    // Validate that all required fields are present
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // Check if a user with this email already exists in the database
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // Hash the plain-text password with a salt round of 12 before storing
    // (higher number = more secure but slower)
    const hashed = await bcrypt.hash(password, 12);

    // Save the new user to the database with the hashed password
    await User.create({ name, email, password: hashed });

    // Respond with 201 Created on success
    res.status(201).json({ message: 'Account created successfully!' });

  } catch (err) {
    // Return any unexpected server errors to the client
    res.status(500).json({ message: err.message });
  }
};

// Handler for POST /api/auth/login
// Validates credentials and returns a signed JWT token on success
exports.login = async (req, res) => {
  try {
    // Destructure email and password from the request body
    const { email, password } = req.body;

    // Validate that both fields are provided
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // Look up the user by email in the database
    const user = await User.findOne({ email });

    // Return a generic "Invalid credentials" message to avoid revealing
    // whether the email exists (security best practice)
    if (!user) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Compare the submitted plain-text password against the stored hashed password
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // Sign a JWT with the user's ID and name, valid for 1 day
    const token = jwt.sign(
      { id: user._id, name: user.name }, // Payload stored inside the token
      process.env.JWT_SECRET,             // Secret key used to sign the token
      { expiresIn: '1d' }                 // Token expiry duration
    );

    // Return the token and user's name to the client
    res.status(200).json({ token, name: user.name });

  } catch (err) {
    // Return any unexpected server errors to the client
    res.status(500).json({ message: err.message });
  }
};