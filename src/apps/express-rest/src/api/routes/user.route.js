'use strict';

const { Router } = require('express');
const { UserModel } = require('../../models/user.model');
const { UserService } = require('../../services/user.service');
const userController = require('../controllers/user.controller');

module.exports = (db) => {
  const router = Router();

  const { createUser, getUserById } = userController(
    new UserService(new UserModel(db))
  );

  router.post('/', createUser);
  router.get('/:userId', getUserById);

  return router;
};
