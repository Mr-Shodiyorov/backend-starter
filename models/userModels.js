const mongoose = require('mongoose');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must have in User model'],
  },
  email: {
    type: String,
    required: [true, 'Email must have in User model'],
    unique: true,
    lowercase: true,
  },
  role: {
    type: String,
    enum: ['user', 'admin', 'guide', 'lead-guide'],
    default: 'user',
  },
  active: {
    type: Boolean,
    default: true,
  },
  photo: {
    type: String,
    default: 'default.jpg',
  },
  password: {
    type: String,
    required: [true, 'Password must have in User model'],
    minlength: 8,
  },
});

const User = mongoose.model('User', userSchema);

module.exports = User;