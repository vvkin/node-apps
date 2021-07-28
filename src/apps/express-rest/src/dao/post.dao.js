'use strict';

const db = require('../db');

class PostDAO {
  constructor() {
    this.table = 'posts';
  }

  async getOne(postId) {
    const posts = await db.find('*', this.table, {
      post_id: postId,
    });
    return posts[0];
  }
}

module.exports = { PostDAO };
