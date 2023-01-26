const { Router } = require('express');

const router = Router();

router.use('/auth', require('./user/user.routes'))

module.exports = router;