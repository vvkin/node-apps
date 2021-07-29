'use strict';

const { BaseModel } = require('./base.model');

class PostModel extends BaseModel {
  constructor(db) {
    super('Posts', 'postId', db);
  }
}

module.exports = { PostModel };
