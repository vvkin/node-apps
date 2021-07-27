'use strict';

const express = require('express');

const users = require('./routes/users');
const posts = require('./routes/posts');

const PORT = 8080;

const app = express();
app.use(express.json());

app.use('/users', users);
app.use('/posts', posts);

app.listen(PORT, () => {
  console.log(`Server started on http://localhost:${PORT}`);
});
