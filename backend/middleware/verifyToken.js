const jwt  = require('jsonwebtoken');
const User = require('../models/User');

// Middleware to protect routes by verifying the JWT token on incoming requests
const verifyToken = async (req, res, next) => {
  try {
    // Read the Authorization header from the request (expected format: "Bearer <token>")
    const authHeader = req.headers.authorization;

    // Reject the request if no Authorization header is present or it's not a Bearer token
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      return res.status(401).json({ message: 'No token provided. Please log in.' });
    }


    const token = authHeader.split(' ')[1];
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    const user = await User.findById(decoded.id);


    if (!user) {
      return res.status(401).json({ message: 'User no longer exists.' });
    }

    req.user = user;

    // Pass control to the next middleware or route handler
    next();

  } catch (err) {
    if (err.name === 'TokenExpiredError') {
      return res.status(401).json({ message: 'Token expired. Please log in again.' });
    }
    return res.status(401).json({ message: 'Invalid token. Please log in again.' });
  }
};

// Export the middleware so it can be applied to any protected route
module.exports = verifyToken;