const UserService = require('./user.service');

const Login = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await UserService.Login(reqBody);
    res.status(200).json(data);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message })
  }
}

const Register = async (req, res) => {
  try {
    const reqBody = req.body;
    const data = await UserService.Register(reqBody);
    res.status(201).json(data);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message })
  }
}

const Profile = async (req, res) => {
  try {
    const user = req.user;
    res.status(200).json(user);
  } catch (err) {
    return res.status(err.status || 500).json({ error: err.message })
  }
}

module.exports = {
  Login,
  Register,
  Profile
}