'use strict';

const { Router } = require('express');
const { UserService } = require('../../services/user.service');
const makeUserController = require('../controllers/user.controller');

module.exports = (userModel, postModel) => {
  const router = Router();

  const {
    createUser,
    getUserById,
    getUserByUsername,
    getUserFollowers,
    getUserFollows,
    getUserPosts,
    deleteUserById,
    updateUserById,
    followUser,
    unfollowUser,
  } = makeUserController(new UserService(userModel, postModel));

  router.get('/', getUserByUsername);
  router.get('/:userId', getUserById);
  router.post('/', createUser);
  router.patch('/:userId', updateUserById);
  router.delete('/:userId', deleteUserById);

  router.get('/:userId/followers', getUserFollowers);
  router.get('/:userId/follows', getUserFollows);
  router.post('/:followerId/follows/:followedId', followUser);
  router.delete('/:followerId/follows/:followedId', unfollowUser);

  router.get('/:userId/posts', getUserPosts);

  return router;
};
