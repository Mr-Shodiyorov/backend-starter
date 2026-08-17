const mongoose = require('mongoose');
const slugify = require('slugify');
const validator = require('validator');
const tourSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: [true, 'Name must have in Tour model'],
      unique: true,
      maxLength: [40, 'A tour name must have less or equal then 40 letter '],
      minLength: [10, 'A tour name must have more or equal then 10 letter '],
      validate: [validator.isAlpha, 'Tour name only should contain characters']
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
      enum: {
        values: ['easy', 'meduim', 'difficult'],
        message: 'Difficulty is either : easy , medium or difficult',
      },
    },
    ratingsAverage: {
      type: Number,
      required: [true, 'ratingsAverage must have in Tour model'],
      min: [1, 'Rating must be above 1.0'],
      max: [5, 'Rating must be below 5.0'],
    },
    ratingsQuantity: {
      type: Number,
      required: [true, 'ratingsQuantity must have in Tour model'],
    },
    price: {
      type: Number,
      required: [true, 'price must have in Tour model'],
    },
    discountPrice: {
      type: Number,
      validate: {
        validator: function (val) {
          return val < this.price
        },
        message: 'Discount price should be below regular price',
      },
      default: 0,
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
    slug: String,
    secretTour: {
      type: Boolean,
      default: false,
    },
  },
  {
    toJSON: { virtuals: true },
    toObject: { virtuals: true },
  },
);

// Virtual: duration in weeks
tourSchema.virtual('durationWeek').get(function () {
  return this.duration / 7;
});
// Generate slug before saving
tourSchema.pre('save', function () {
  this.slug = slugify(this.name, { lower: true });
});
// Hide secret tours from queries
tourSchema.pre(/^find/, function () {
  this.find({ secretTour: { $ne: true } });
});
// Hide secret tours from aggregation
tourSchema.pre('aggregate', function () {
  this.pipeline().unshift({ $match: { secretTour: { $ne: true } } });
});

const Tour = mongoose.model('Tour', tourSchema);

module.exports = Tour;
