const express = require('express');
const passport = require('passport');
const cors = require('cors');

const { Jwt } = require('./passport');

const app = express();

app.use(express.json());

// Enable CORS - Cross Origin Resource Sharing
app.use(cors());

app.use(passport.initialize());
passport.use('jwt', Jwt);

// Mounting api routing
app.use('/api/v1', require('../api/router'));

// If error is not an instanceOf APIError, convert it.
app.use('*', (req, res) => {
  res.status(500).json({ error: 'Internal server error' })
});


module.exports = app;