const Joi = require("joi");

const Login = {
  body: {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required()
  }
}


const Register = {
  body: {
    email: Joi.string().email({ minDomainSegments: 2 }).required(),
    password: Joi.string().min(6).required(),
    firstName: Joi.string().min(2).required(),
    lastName: Joi.string().min(2).required(),
  }
}

module.exports = {
  Login,
  Register
}