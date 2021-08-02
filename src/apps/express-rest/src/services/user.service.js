'use strict';

const { EntityNotFound, EntityConflict } = require('../helpers/entity-errors');

class UserService {
  constructor(userModel) {
    this.userModel = userModel;
  }

  async findOne(conditions) {
    const user = await this.userModel.findOne(conditions);
    if (user) {
      return user;
    } else throw new EntityNotFound('User not found');
  }

  async create(username, email, fullName) {
    if (await this.findOne({ username }))
      throw new EntityConflict('Username is already taken');
    if (await this.findOne({ email }))
      throw new EntityConflict('Email is already taken');
    return this.userModel.create(username, email, fullName);
  }

  async delete(conditions) {
    const userId = this.userModel.delete(conditions);
    if (userId) {
      return userId;
    } else throw new EntityNotFound('user not found');
  }
}

module.exports = { UserService };
