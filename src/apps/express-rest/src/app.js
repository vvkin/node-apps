'use strict';

require('dotenv').config();
const express = require('express');
const router = require('./api');

const app = express();
app.use(express.json());
app.use('/api', router);

const PORT = process.env.PORT || 8080;
const HOST = process.env.HOST || '127.0.0.1';

app.listen(PORT, HOST, () => {
  console.log(`Server started on http://${HOST}:${PORT}`);
});
