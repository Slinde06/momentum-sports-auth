const bcrypt = require('bcryptjs');
const jwt    = require('jsonwebtoken');
const User   = require('../models/User');

// ─────────────────────────────────────────────────────────────────────────────
// REGISTER
// POST /api/auth/register
// Body: { name, email, password }
// ─────────────────────────────────────────────────────────────────────────────
exports.register = async (req, res) => {
  try {
    const { name, email, password } = req.body;

    // 1. Make sure all fields were sent
    if (!name || !email || !password) {
      return res.status(400).json({ message: 'Please fill in all fields' });
    }

    // 2. Check if the email is already taken
    const existing = await User.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: 'Email already in use' });
    }

    // 3. Hash the password — NEVER store plain text
    //    12 = work factor (how hard it is to crack — higher = safer but slower)
    const hashed = await bcrypt.hash(password, 12);

    // 4. Save the new user to MongoDB
    const user = await User.create({
      name,
      email,
      password: hashed,   // store the hash, not the original password
    });

    // 5. Respond with success — user must now log in to get a token
    res.status(201).json({ message: 'Account created successfully!' });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

// ─────────────────────────────────────────────────────────────────────────────
// LOGIN
// POST /api/auth/login
// Body: { email, password }
// ─────────────────────────────────────────────────────────────────────────────
exports.login = async (req, res) => {
  try {
    const { email, password } = req.body;

    // 1. Make sure both fields were sent
    if (!email || !password) {
      return res.status(400).json({ message: 'Please provide email and password' });
    }

    // 2. Find the user by email
    const user = await User.findOne({ email });
    if (!user) {
      // Vague message on purpose — don't reveal which field is wrong
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 3. Compare submitted password against the stored hash
    //    bcrypt.compare hashes the plain text and checks if it matches
    const match = await bcrypt.compare(password, user.password);
    if (!match) {
      return res.status(401).json({ message: 'Invalid credentials' });
    }

    // 4. Create a JWT — contains the user's id and name, signed with our secret
    const token = jwt.sign(
      { id: user._id, name: user.name },   // payload — what's inside the token
      process.env.JWT_SECRET,              // secret key — only the server knows this
      { expiresIn: '1d' }                  // token expires after 1 day
    );

    // 5. Send the token back to the frontend
    res.status(200).json({
      token,            // the JWT string
      name: user.name,  // handy for showing "Welcome, Jane" in the UI
    });

  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};
