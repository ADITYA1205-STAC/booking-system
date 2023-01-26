const { Router } = require('express');

const UserController = require('./user.controller');
const UserValidation = require('./user.validation');

const { Validate } = require('../../middleware/validate');
const { Authorize } = require('../../middleware/auth');


const router = Router();

router.post('/login', Validate(UserValidation.Login), UserController.Login);

router.post('/register', Validate(UserValidation.Register), UserController.Register);

router.post('/me', Authorize(), UserController.Profile)

module.exports = router;