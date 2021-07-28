'use strict';

const { PostDAO } = require('../dao/post.dao');

class PostService {
  constructor() {
    this.dao = new PostDAO();
  }

  async getPost(postId) {
    return this.dao.getOne(postId);
  }
}

module.exports = { PostService };
