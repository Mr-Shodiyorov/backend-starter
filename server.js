const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);

const dotenv = require('dotenv');
dotenv.config({ path: '.env' });

const mongoose = require('mongoose');

const app = require('./app');

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Mongo DB connected successfully');
  })
  .catch((err) => {
    console.error(err);
    console.error(err.stack);
  });



const port = process.env.PORT || 4400;
app.listen(port, () => {
  console.log(`Listening on port ${port}`);
});
