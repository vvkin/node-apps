'use strict';

class PostService {
  constructor(postDAO) {
    this.dao = postDAO;
  }

  async getPostById(postId) {
    try {
      const post = await this.dao.getOne({ postId });
      return [null, post];
    } catch (err) {
      return [err];
    }
  }

  async createPost(authorId, title, content) {
    try {
      const postId = await this.dao.create({ authorId, title, content });
      return [null, postId];
    } catch (err) {
      return [err];
    }
  }
}

module.exports = { PostService };
