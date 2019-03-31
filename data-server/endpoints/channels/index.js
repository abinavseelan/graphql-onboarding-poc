const express = require('express');

const getChannels = require('./getChannels');

const router = express.Router();

router.get('/:userId', getChannels);

module.exports = router;
