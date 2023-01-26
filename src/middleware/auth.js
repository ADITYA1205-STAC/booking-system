const passport = require('passport');


const handleJWT = (req, res, next) => async (err, user, info) => {
  const error = err || info;
  if (error || !user) {
    return res.status(401).json({ error: 'Unauthorized' });
  }
  if (!user.isEmailverified) {
    return res.status(401).json({ error: 'Please verify email to continue' });
  }
  req.user = user;
  return next();
};

exports.Authorize = () => (req, res, next) => passport.authenticate('jwt',
  { session: false },
  handleJWT(req, res, next))(req, res, next);