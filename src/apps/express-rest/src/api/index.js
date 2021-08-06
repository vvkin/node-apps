'use strict';

const { Router } = require('express');
const { Database } = require('../db/index');
const { UserModel } = require('../models/user.model');
const { PostModel } = require('../models/post.model');

const { mapErrors } = require('./middlewares/map-errors');
const { handleErrors } = require('./middlewares/handle-errors');

const router = Router();
const makePostRouter = require('./routes/post.route');
const makeUserRouter = require('./routes/user.route');

const database = new Database();
const userModel = new UserModel(database);
const postModel = new PostModel(database);

router.use('/posts', makePostRouter(postModel));
router.use('/users', makeUserRouter(userModel, postModel));
router.use(mapErrors);
router.use(handleErrors);

module.exports = router;
