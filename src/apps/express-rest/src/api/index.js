'use strict';

const { Router } = require('express');

const { Database } = require('../db/index');
const postRouter = require('./routes/post.route');
const userRouter = require('./routes/user.route');

const database = new Database();
const router = Router();

router.use('/posts', postRouter(database));
router.use('/users', userRouter(database));

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  const { code, message } = err;
  const reply = { success: false, message };
  res.status(code || 500).json(reply);
});

module.exports = router;
