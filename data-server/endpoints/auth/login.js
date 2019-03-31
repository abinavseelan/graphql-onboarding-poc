const crypto = require('crypto');

const generateSessionID = function () {
  var sha = crypto.createHash('sha256');
  sha.update(Math.random().toString());
  return sha.digest('hex');
};

const data = require('../../data');

module.exports = (req, res) => {
  const { username, password } = req.body;

  if (!username || !password) {
    return res.status(400).json({
      message: 'Please provide both username & password',
    });
  }

  const existingUser = data.users.find((u) => u.username === username && password === password);

  if (!existingUser) {
    return res.status(404).json({
      message: 'User does not exist',
    });
  }

  const sessionID = generateSessionID();

  data.activeSessions.push({
    username: existingUser.username,
    sessionID,
  });

  res.status(200).json({
    sessionID,
  });
};
