'use strict';

const { Router } = require('express');
const { UserModel } = require('../../models/user.model');
const { UserService } = require('../../services/user.service');
const makeUserController = require('../controllers/user.controller');

module.exports = (database) => {
  const router = Router();

  const { createUser, getUserById } = makeUserController(
    new UserService(new UserModel(database))
  );

  router.post('/', createUser);
  router.get('/:userId', getUserById);

  return router;
};
