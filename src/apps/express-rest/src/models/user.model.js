'use strict';

const { BaseModel } = require('./base.model');

class UserModel extends BaseModel {
  constructor(db) {
    super('Users', 'userId', db);
  }

  async follow({ followerId, followedId }) {
    const rows = await this.db.insert({
      table: 'Followers',
      items: { followerId, followedId },
      returning: ['*'],
    });
    return rows?.[0];
  }

  async unfollow({ followerId, followedId }) {
    const rows = await this.db.delete({
      table: 'Followers',
      where: { followerId, followedId },
      returning: ['*'],
    });
    return rows?.[0];
  }

  async getFollowers({ userId }) {
    const query =
      'SELECT * FROM "Users" WHERE EXISTS ' +
      '(SELECT 1 FROM "Followers" ' +
      'WHERE "followedId" = $1 AND "followerId" = "userId")';
    return this.db.query(query, [userId]);
  }

  async getFollows({ userId }) {
    const query =
      'SELECT * FROM "Users" WHERE EXISTS ' +
      '(SELECT 1 FROM "Followers" ' +
      'WHERE "followedId" = "userId" AND "followerId" = $1)';
    return this.db.query(query, [userId]);
  }
}

module.exports = { UserModel };
