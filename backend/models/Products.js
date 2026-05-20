const mongoose = require('mongoose');

const productsSchema = new mongoose.Schema(
  {
    name: { type: String, required: true, trim: true },
    description: { type: String, default: '' },
    price: { type: Number, required: true, min: 0 },
    imageUrl: { type: String, default: '' },
    category: { type: String, default: '' },
    stock: { type: Number, default: 0, min: 0 },
  },
  { timestamps: true }
);

const Product = mongoose.model('Product', productsSchema);
module.exports = Product;