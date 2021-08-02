'use strict';

const { Router } = require('express');
const { Database } = require('../db/index');

const { mapErrors } = require('./middlewares/map-errors');
const { handleErrors } = require('./middlewares/handle-errors');

const makePostRouter = require('./routes/post.route');
const makeUserRouter = require('./routes/user.route');

const router = Router();
const database = new Database();

router.use('/posts', makePostRouter(database));
router.use('/users', makeUserRouter(database));
router.use(mapErrors);
router.use(handleErrors);

module.exports = router;
