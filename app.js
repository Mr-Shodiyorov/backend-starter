const express = require('express');
const app = express();
const morgan = require('morgan');
const fs = require('fs');
const routerTour = require('./routes/tourRoutes');
const routerUser = require('./routes/userRoutes');
app.use(express.json());

if (process.env.NODE_ENV == 'developemnt') {
  app.use(morgan('dev'));
}

app.set('query parser', 'extended');

app.use((req, res, next) => {
  console.log('Middleware ishladi');
  req.requestTime = new Date().toISOString();
  next();
});

app.use('/api/v1/tours', routerTour);
app.use('/api/v1/users', routerUser);

app.get('/', (req, res) => {
  res.send(
    'Server is working and you are now in / page <br/> <a href="/api/v1/tours">click to go to tours</a>',
  );
});

module.exports = app;
