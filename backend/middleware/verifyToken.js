// ─────────────────────────────────────────────────────────────────────────────
// verifyToken middleware
// ─────────────────────────────────────────────────────────────────────────────
// NOT used in this lecture — this is set up ready for the NEXT lecture on
// authorization and protected routes.
//
// What it will do:
//   1. Read the JWT from the Authorization header ("Bearer <token>")
//   2. Verify it was signed with our JWT_SECRET and hasn't expired
//   3. Attach the decoded user (id, name) to req.user
//   4. Call next() so the route handler can run
//
// Usage (next lecture):
//   router.get('/profile', verifyToken, profileController);
// ─────────────────────────────────────────────────────────────────────────────

const jwt  = require('jsonwebtoken');
const User = require('../models/User');

const verifyToken = async (req, res, next) => {
  try {
    // Get token from "Authorization: Bearer <token>" header
    const authHeader = req.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Please log in.' });
    }

    const token = authHeader.split(' ')[1];

    // Verify the token — throws if expired or tampered with
    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    // Fetch the real user from the database
    const user = await User.findById(decoded.id);
    if (!user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    // Attach user to request for downstream use
    req.user = user;
    next();

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
};

module.exports = verifyToken;
