const mongoose = require('mongoose');

// Define the schema (structure) for a User document in MongoDB
const userSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name is required'], // Validation: name must be provided
      trim: true,                       
    },
    email: {
      type: String,
      required: [true, 'Email is required'], // Validation: email must be provided
      unique: true,                          // Enforce unique emails across all users
      lowercase: true,                       // Automatically convert email to lowercase before saving
      trim: true,                            // Strip whitespace from email
    },
    password: {
      type: String,
      required: [true, 'Password is required'], 
      minlength: [6, 'Password must be at least 6 characters'], 
    },
  },
  { timestamps: true } // Automatically add createdAt and updatedAt fields to each document
);

// Export the User model so it can be used in controllers and middleware
module.exports = mongoose.model('User', userSchema);