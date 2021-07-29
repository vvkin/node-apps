'use strict';

const { BaseModel } = require('./base.model');

class UserModel extends BaseModel {
  constructor(db) {
    super('Users', 'userId', db);
  }
}

module.exports = { UserModel };
