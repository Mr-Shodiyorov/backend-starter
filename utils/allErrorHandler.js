const AppError = require('./apiErrors');

const sendErrorDev = (error, res) => {
  res.status(error.statusCode).json({
    status: error.status,
    error,
    message: error.message,
    stack: error.stack,
  });
};
const sendErrorProd = (error, res) => {
  if (error.isOperational) {
    return res.status(error.statusCode).json({
      status: error.status,
      message: error.message,
    });
  }
  console.error('ERROR', error);
  res.status(500).json({
    status: 'error',
    message: 'something went wrong',
  });
};

module.exports = (err, req, res, next) => {
  let error = err;
  if (err.name == 'CastError') {
    error = new AppError(`Invalid ${err.path}: ${err.value}`, 404);
  }
  if (err.name == 'ValidationError') {
    const messages = Object.values(err.errors).map((el) => el.message);
    error = new AppError(`Invalid input data. ${messages.join('. ')}`, 400);
  }
  if(err.code == 11000){
    const value = Object.values(err.keyValue).join('. ')
    error = new AppError(`Dublicate field value: ${value}`, 400)
  }
  error.statusCode = error.statusCode || 500;
  error.status = error.status || 'error';
  if (process.env.NODE_ENV == 'development') {
    sendErrorDev(error, res);
  } else {
    sendErrorProd(error, res);
  }
};
