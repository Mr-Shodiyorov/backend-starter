const dns = require('dns');
dns.setServers(['8.8.8.8', '8.8.4.4']);
const dotenv = require('dotenv');
dotenv.config({ path: '.env' });
const mongoose = require('mongoose');
let fs = require('fs');
let Tour = require('../../models/tourModels');

mongoose
  .connect(process.env.DATABASE)
  .then(() => {
    console.log('Mongo DB connected successfully');
  })
  .catch((err) => {
    console.error(err);
    console.error(err.stack);
  });

// Read File
let tours = JSON.parse(
  fs.readFileSync(`${__dirname}/tours-simple.json`, 'utf-8'),
);

// Import File
let importFile = async () => {
  try {
    await Tour.create(tours);
    console.log('Data loaded successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};
// Eleminate All Data
let deleteAllFile = async () => {
  try {
    await Tour.deleteMany();
    console.log('Data was eleminated successfully');
  } catch (err) {
    console.log(err);
  }
  process.exit();
};

if(process.argv[2]=="--import"){
    importFile()
}
if(process.argv[2]=="--delete"){
    deleteAllFile()
}

console.log('Hello there');
