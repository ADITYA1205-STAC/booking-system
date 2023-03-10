const mongoose = require('mongoose');
const { env, mongoURI } = require('./env-vars');

mongoose.Promise = global.Promise;

mongoose.set('debug', env === 'development');

mongoose.connection.on('error', (err) => {
  console.error(`MongoDB Connection Error ${err}`);
});

mongoose.connection.on('connected', () => {
  console.info('Connected To DB');
});

exports.Connect = () => {
  mongoose.connect(mongoURI);
  return mongoose.connection;
};