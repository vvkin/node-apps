'use strict';

const userDAO = require('../dao/user.dao');

const getById = async (userId) => {
  return userDAO.getOne(userId);
};

const getByUsername = async (username) => {
  return userDAO.getOne(username);
};

const createUser = async (username, email, fullName) => {
  try {
    const userId = await userDAO.create(username, email, fullName);
    return userId;
  } catch (err) {
    return null;
  }
};

module.exports = { getById, getByUsername, createUser };
