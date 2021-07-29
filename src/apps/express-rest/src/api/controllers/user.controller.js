'use strict';

module.exports = (userService) => {
  const getUserById = async (req, res, next) => {
    const { userId } = req.params;
    const [err, user] = await userService.getUserById(userId);
    if (!err) {
      res.status(200).json({ user });
    } else next(err);
  };

  const createUser = async (req, res, next) => {
    const { username, email, fullName } = req.body;
    const [err, userId] = await userService.createUser(
      username,
      email,
      fullName
    );
    if (!err) {
      res.status(201).json({ userId });
    } else next(err);
  };

  return { getUserById, createUser };
};
