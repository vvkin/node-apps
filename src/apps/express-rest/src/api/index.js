'use strict';

const { Router } = require('express');

const postRouter = require('./routes/post.route');
const userRouter = require('./routes/user.route');

const router = Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);

// eslint-disable-next-line no-unused-vars
router.use((err, req, res, next) => {
  const { code, message } = err;
  const reply = { success: false, message };
  res.status(code || 500).json(reply);
});

module.exports = router;
