const data = require('../../data');

module.exports = (req, res, next) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Please provide both username & password',
    });
  }

  const existingUser = data.users.find((u) => u.username === username);

  if (existingUser) {
    return res.status(403).message({
      message: 'User already exists',
    });
  }

  res.sendStatus(201);
};
