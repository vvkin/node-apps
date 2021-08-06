'use strict';

module.exports = (userService) => {
  const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await userService.findOne({ userId });
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  };

  const getUserByUsername = async (req, res, next) => {
    const { username } = req.query;
    try {
      const user = await userService.findOne({ username });
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  };

  const createUser = async (req, res, next) => {
    const { username, email, fullName } = req.body;
    try {
      const userId = await userService.create({ username, email, fullName });
      res.status(201).json({ userId });
    } catch (err) {
      next(err);
    }
  };

  const updateUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await userService.update(userId, req.body);
      res.status(201).json({ user });
    } catch (err) {
      next(err);
    }
  };

  const deleteUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const deletedId = await userService.delete(userId);
      res.status(200).join({ userId: deletedId });
    } catch (err) {
      next(err);
    }
  };

  const getUserFollowers = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const followers = await userService.getFollowers(userId);
      res.status(200).json({ followers });
    } catch (err) {
      next(err);
    }
  };

  const getUserFollows = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const follows = await userService.getFollows(userId);
      res.status(200).json({ follows });
    } catch (err) {
      next(err);
    }
  };

  const getUserPosts = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const posts = await userService.getPosts(userId);
      res.status(200).json({ posts });
    } catch (err) {
      next(err);
    }
  };

  const followUser = async (req, res, next) => {
    const { followerId, followedId } = req.params;
    try {
      const relation = await userService.follow(followerId, followedId);
      res.status(200).json(relation);
    } catch (err) {
      next(err);
    }
  };

  const unfollowUser = async (req, res, next) => {
    const { followerId, followedId } = req.params;
    try {
      const relation = await userService.unfollow(followerId, followedId);
      res.status(200).json(relation);
    } catch (err) {
      next(err);
    }
  };

  return {
    getUserById,
    getUserByUsername,
    getUserFollowers,
    getUserFollows,
    getUserPosts,
    updateUserById,
    deleteUserById,
    createUser,
    followUser,
    unfollowUser,
  };
};
