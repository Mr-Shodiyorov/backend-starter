const mongoose = require('mongoose');
const tourSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Name must have in Tour model'],
    unique: true,
  },
  duration: {
    type: Number,
    required: [true, 'Duration must have in Tour model'],
  },
  maxGroupSize: {
    type: Number,
    required: [true, 'maxGroupSize must have in Tour model'],
  },
  difficulty: {
    type: String,
    required: [true, 'difficulty must have in Tour model'],
  },
  ratingsAverage: {
    type: Number,
    required: [true, 'ratingsAverage must have in Tour model'],
  },
  ratingsQuantity: {
    type: Number,
    required: [true, 'ratingsQuantity must have in Tour model'],
  },
  price: {
    type: Number,
    required: [true, 'price must have in Tour model'],
  },
  summary: {
    type: String,
    required: [true, 'summary must have in Tour model'],
  },
  description: {
    type: String,
    required: [true, 'description must have in Tour model'],
  },
  imageCover: {
    type: String,
    required: [true, 'imageCover must have in Tour model'],
  },
  images: {
    type: [String],
    required: [true, 'image must have in Tour model'],
  },
  startDates: {
    type: [Date],
    required: [true, 'startDates must have in Tour model'],
  },
  createdAt: {
    type: Date,
    default: Date.now(),
  },
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
