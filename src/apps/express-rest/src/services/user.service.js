'use strict';

class UserService {
  constructor(userDAO) {
    this.dao = userDAO;
  }

  async getUserById(userId) {
    return this.dao.getOne({ userId });
  }

  async getUserByUsername(username) {
    return this.dao.getOne({ username });
  }

  async createUser(username, email, fullName) {
    try {
      const userId = await this.dao.create({ username, email, fullName });
      return [null, userId];
    } catch (err) {
      return [err];
    }
  }
}

module.exports = { UserService };
