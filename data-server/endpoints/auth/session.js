const data = require('../../data');

module.exports = (req, res, next) => {
  const { sessionID } = req.body;

  if (!sessionID) {
    return res.status(400).json({
      message: 'No Session ID provided',
    });
  }

  const existingSession = data.activeSessions.find((a) => a.sessionID === sessionID);

  if (!existingSession) {
    return res.sendStatus(404);
  }

  res.sendStatus(200);
};
