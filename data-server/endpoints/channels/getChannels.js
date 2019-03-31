const data = require('../../data');

module.exports = (req, res) => {
  const { userId } = req.params;

  const channelsBelongingToUser = data.channels.filter(o => o.owner === userId);

  res.status(200).json({
    channels: channelsBelongingToUser,
  });
}
