const Tour = require('../models/tourModels');
const APIfeatures = require('./../utils/APIfeatures');
const asyncCatch = require('../utils/asyncCatch');
const AppError = require('../utils/apiErrors');
exports.getTopFiveCheap = (req, res, next) => {
  req.topFiceOptions = {
    limit: '5',
    sort: 'price',
    fields: 'name,price,summary',
  };

  next();
};

exports.getAllTours = asyncCatch(async (req, res) => {
  const queryParams = {
    ...req.query,
    ...(req.topFiceOptions || {}),
  };

  const features = new APIfeatures(Tour.find(), queryParams)
    .filter()
    .sort()
    .fields()
    .pagination();
  const tours = await features.query;

  res.status(200).json({
    status: 'success',
    result: tours.length,
    requestTime: req.requestTime,
    data: {
      tours,
    },
  });
});
exports.getTour = asyncCatch(async (req, res, next) => {
  const tour = await Tour.findById(req.params.id);
  if(!tour){
    return next(new AppError('No tour find with that id', 404))
  }
  res.status(200).json({
    status: 'success',
    data: {
      tour,
    },
  });
});
exports.updateTour = asyncCatch(async (req, res) => {
  const updatedTour = await Tour.findByIdAndUpdate(req.params.id, req.body, {
    new: true,
    runValidators: true,
  });
  res.status(200).json({
    status: 'success',
    data: {
      ...updatedTour,
    },
  });
});
exports.postTour = asyncCatch(async (req, res) => {
  const newTour = await Tour.create(req.body);
  res.status(201).json({
    status: 'success',
    data: {
      tour: newTour,
    },
  });
});
exports.deleteTour = asyncCatch(async (req, res) => {
  const deleteTour = await Tour.findByIdAndDelete(req.params.id);
  res.status(204).json({
    status: 'success',
    message: 'item was eleminated successfuly',
  });
});

exports.getStatus = asyncCatch(async (req, res) => {
  const stats = await Tour.aggregate([
    {
      $match: { ratingsAverage: { $gte: 4.5 } },
    },
    {
      $group: {
        _id: { $toUpper: '$difficulty' },
        numTours: { $sum: 1 },
        avgRating: { $sum: '$ratingsAverage' },
        maxPrice: { $max: '$price' },
        minPrice: { $min: '$price' },
        avgPrice: { $avg: '$price' },
      },
    },
    {
      $sort: {
        avgPrice: 1,
      },
    },
    {
      $match: {
        _id: { $ne: 'EASY' },
      },
    },
  ]);
  res.status(200).json({
    status: 'success',
    data: {
      tour: stats,
    },
  });
});
