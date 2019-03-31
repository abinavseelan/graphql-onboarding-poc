const express = require('express');
const bodyParser = require('body-parser');
const morgan = require('morgan');

const auth = require('./endpoints/auth');
const channels = require('./endpoints/channels');

const port = 4000;
const app = express();

app.use(bodyParser.json());
app.use(morgan('short'));

app.use('/auth', auth);
app.use('/channels', channels);

app.listen(port, () => {
  console.log(`Server running on port ${port}`);
});
