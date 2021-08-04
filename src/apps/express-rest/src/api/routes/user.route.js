'use strict';

const { Router } = require('express');
const { UserModel } = require('../../models/user.model');
const { UserService } = require('../../services/user.service');
const makeUserController = require('../controllers/user.controller');

module.exports = (database) => {
  const router = Router();

  const {
    createUser,
    getUserById,
    getUserByUsername,
    getUserFollowers,
    getUserFollows,
    deleteUserById,
    updateUser,
    followUser,
    unfollowUser,
  } = makeUserController(new UserService(new UserModel(database)));

  router.get('/', getUserByUsername);
  router.get('/:userId', getUserById);
  router.post('/', createUser);
  router.patch('/:userId', updateUser);
  router.delete('/:userId', deleteUserById);

  router.get('/:userId/followers', getUserFollowers);
  router.get('/:userId/follows', getUserFollows);
  router.post('/:followerId/follows/:followedId', followUser);
  router.delete('/:followerId/follows/:followedId', unfollowUser);

  return router;
};
