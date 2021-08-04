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

  async delete(conditions) {
    const userId = this.userModel.delete(conditions);
    if (userId) {
      return userId;
    } else throw new EntityNotFound('User not found');
  }

  async create(username, email, fullName) {
    if (await this.userModel.findOne({ username }))
      throw new EntityConflict('Username is already taken');
    if (await this.userModel.findOne({ email }))
      throw new EntityConflict('Email is already taken');
    return this.userModel.create({ username, email, fullName });
  }

  async follow(followerId, followedId) {
    const relation = await this.userModel.follow({ followerId, followedId });
    if (relation) {
      return relation;
    } else throw new EntityConflict('Unable to create relation');
  }

  async unfollow(followerId, followedId) {
    const relation = await this.userModel.unfollow({ followerId, followedId });
    if (relation) {
      return relation;
    } else throw new EntityNotFound('Relation not found');
  }

  async getFollows(userId) {
    await this.findOne({ userId }); // throw if doesn't exist
    return this.userModel.getFollows({ userId });
  }

  async getFollowers(userId) {
    await this.findOne({ userId });
    return this.userModel.getFollowers({ userId });
  }
}

module.exports = { UserService };
