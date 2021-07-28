'use strict';

require('dotenv').config();
const express = require('express');
const apiRouter = require('./api');

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';

const app = express();
app.use(express.json());
app.use('/api', apiRouter);

app.listen(PORT, HOST, () => {
  console.log(`Server started on http://${HOST}:${PORT}`);
});
