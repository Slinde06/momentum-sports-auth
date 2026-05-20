const express  = require('express');
const mongoose = require('mongoose');
const cors     = require('cors');
require('dotenv').config();

const app = express();

// ── Middleware ──────────────────────────────────
app.use(cors());
app.use(express.json());

// ── Routes ──────────────────────────────────────

const productsRoutes = require('../routes/ProductsRoutes');
app.use('/api/products', productsRoutes);


// ── Global error handler ─────────────────────────
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ message: 'Internal server error' });
});

// ── Database connection ─────────────────────────
const port = process.env.PORT || 5000;

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});

mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    console.log('Connected to MongoDB Atlas');
  })
  .catch(err => console.error('DB connection failed:', err));