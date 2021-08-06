'use strict';

const { EntityNotFound, EntityConflict } = require('../helpers/entity-errors');

class UserService {
  constructor(userModel, postModel) {
    this.userModel = userModel;
    this.postModel = postModel;
  }

  async checkUniques({ username, email }) {
    const reason =
      ((await this.userModel.findOne({ username })) && 'Username') ||
      ((await this.userModel.findOne({ email })) && 'Email');
    return reason ? new EntityConflict(`${reason} is already taken`) : null;
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

  async create(dto) {
    const error = await this.checkUniques(dto);
    if (error) throw error;
    return this.userModel.create(dto);
  }

  async update(userId, dto) {
    const error = await this.checkUniques(dto);
    if (error) throw error;
    const user = await this.userModel.update({ dto, conditions: { userId } });
    if (user) {
      return user;
    } else throw new EntityNotFound('User not found');
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

  async getPosts(userId) {
    await this.findOne({ userId });
    return this.postModel.findAll({ authorId: userId });
  }
}

module.exports = { UserService };
