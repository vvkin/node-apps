'use strict';

module.exports = (userService) => {
  const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const user = await userService.findById(userId);
      res.status(200).json({ user });
    } catch (err) {
      next(err);
    }
  };

  const createUser = async (req, res, next) => {
    const { username, email, fullName } = req.body;
    try {
      const userId = await userService.create(username, email, fullName);
      res.status(201).json({ userId });
    } catch (err) {
      next(err);
    }
  };

  const updateUser = async (req, res, next) => {
    const { userId } = req.params;
    const { fullName } = req.body;
    try {
      const user = await userService.update(userId, fullName);
      res.statrus(201).json({ user });
    } catch (err) {
      next(err);
    }
  };

  const deleteUser = async (req, res, next) => {
    const { userId } = req.params;
    try {
      const deletedId = await userService.delete(userId);
      res.status(200).join({ userId: deletedId });
    } catch (err) {
      next(err);
    }
  };

  return { getUserById, createUser, updateUser, deleteUser };
};
