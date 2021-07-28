'use strict';

const { Router } = require('express');

const postRouter = require('./routes/post.route');
const userRouter = require('./routes/user.route');

const router = Router();

router.use('/posts', postRouter);
router.use('/users', userRouter);

module.exports = router;
