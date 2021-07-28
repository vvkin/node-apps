'use strict';

const { NotFound, Conflict } = require('../../helpers/http-errors');

const userService = require('../../services/user.service');

const getUser = async (req, res, next) => {
  const { userId } = req.params;
  const user = await userService.getUserById(userId);
  if (user) {
    res.status(200).json({ user });
  } else next(new NotFound('User not found'));
};

const createUser = async (req, res, next) => {
  const { username, email, fullName } = req.body;
  const userId = await userService.createUser(username, email, fullName);
  if (userId) {
    res.status(201).json({ userId });
  } else next(new Conflict('Username or email is already taken'));
};

module.exports = {
  getUser,
  createUser,
};
