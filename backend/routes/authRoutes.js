const express = require('express');
const router  = express.Router();
const { register, login } = require('../controllers/authController');

// Route to handle new user registration
// POST /api/auth/register
router.post('/register', register);

// Route to handle user login
// POST /api/auth/login
router.post('/login', login);

module.exports = router;