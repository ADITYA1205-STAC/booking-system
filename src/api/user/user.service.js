const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');
const _ = require('lodash');

const { jwtSecret } = require('../../config/env-vars')
const User = require('./user.model');

exports.Login = async (data) => {
  const { email, password } = data;
  const user = await User.findOne({ email });
  if (!user) {
    throw new Error('user does not exist')
  }
  if (!user.isEmailverified) {
    throw new Error('Please verify email to login')
  }
  const isValidPassword = await bcrypt.compare(password, user.password);
  if (!isValidPassword) {
    throw new Error('Invalid Credentials')
  }
  const tokens = generateTokens(user.toJSON());
  return { user: getLenaUser(user), tokens }
}

exports.Register = async (data) => {
  const { email, password, firstName, lastName } = data;
  try {
    const user = await User.create({
      email,
      firstName,
      lastName,
      password
    });
    return { user: getLenaUser(user) }
  } catch (err) {
    checkDuplication(err);
  } 
}

const getLenaUser = (user) => _.omit(user.toJSON(), ['password', 'isEmailverified']);

const checkDuplication = (error) => {
  console.log(error)
  if (error.code === 11000) {
    const keys = Object.keys(error.keyPattern);
    if (keys.includes('email')) {
      throw new Error('User with same email already exists')
    }
    throw error;
  }
  throw error;
};

const generateTokens = (user) => {
  const tokenData = {
    id: user._id,
    email: user.email,
    isEmailverified: user.isEmailverified,
  }
  return {
    accessToken: jwt.sign(tokenData, jwtSecret, { expiresIn: '30m' }),
    refreshToken: jwt.sign(tokenData, jwtSecret, { expiresIn: '1h' }),
  }
}