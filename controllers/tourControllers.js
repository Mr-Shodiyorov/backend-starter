const Tour = require('../models/tourModels');
const APIfeatures = require('./../utils/APIfeatures');
exports.getTopFiveCheap = (req, res, next) => {
  req.topFiceOptions = {
    limit: '5',
    sort: 'price',
    fields: 'name,price,summary',
  };

  next();
};

exports.getAllTours = async (req, res) => {
  try {
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
  } catch ({ name, message }) {
    res.status(400).json({
      status: 'fail',
      message,
    });
  }
};
exports.getTour = async (req, res) => {
  try {
    const tour = await Tour.findById(req.params.id);
    res.status(200).json({
      status: 'success',
      data: {
        tour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.updateTour = async (req, res) => {
  try {
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
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.postTour = async (req, res) => {
  try {
    const newTour = await Tour.create(req.body);
    res.status(201).json({
      status: 'success',
      data: {
        tour: newTour,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
exports.deleteTour = async (req, res) => {
  try {
    const deleteTour = await Tour.findByIdAndDelete(req.params.id);
    res.status(204).json({
      status: 'success',
      message: 'item was eleminated successfuly',
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};

exports.getStatus = async (req, res) => {
  try {
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
        $sort:{
          avgPrice: 1
        }
      },
      {
        $match:{
          _id: { $ne: "EASY"}
        }
      }
    ]);
    res.status(200).json({
      status: 'success',
      data: {
        tour: stats,
      },
    });
  } catch (err) {
    res.status(400).json({
      status: 'fail',
      message: err,
    });
  }
};
