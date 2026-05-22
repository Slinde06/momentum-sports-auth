require('dotenv').config();

const express    = require('express');
const mongoose   = require('mongoose');
const cors       = require('cors');

// Import authentication routes (register & login endpoints)
const authRoutes = require('./routes/authRoutes');

const app  = express();

// Use PORT from environment 
const PORT = process.env.PORT || 5000;

// Enable CORS so the frontend (running on a different port) can communicate with this server
app.use(cors({
  origin: ['http://localhost:3000', 'http://localhost:5173'],
  credentials: true,
}));


app.use(express.json());

// Mount all authentication routes under the /api/auth prefix
// e.g. POST /api/auth/register and POST /api/auth/login
app.use('/api/auth', authRoutes);

// Connect to MongoDB using the URI from environment variables
mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB');

    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error('MongoDB connection failed:', err.message);
    process.exit(1);
  });