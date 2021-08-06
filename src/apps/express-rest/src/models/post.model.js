'use strict';

const { BaseModel } = require('./base.model');

class PostModel extends BaseModel {
  constructor(db) {
    super('Posts', 'postId', db);
  }

  async findAll({ authorId }) {
    return super.findAll({ authorId });
  }
}

module.exports = { PostModel };
