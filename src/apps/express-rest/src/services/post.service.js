'use strict';

const { EntityNotFound, EntityConflict } = require('../helpers/entity-errors');
const { filterDTO } = require('../helpers/create-dto');

class PostService {
  constructor(postModel) {
    this.postModel = postModel;
  }

  async findOne({ postId }) {
    const post = await this.postModel.findOne({ postId });
    if (post) {
      return post;
    } else throw new EntityNotFound('Post not found');
  }

  async create(authorId, title, content) {
    const postId = await this.postModel.create({ authorId, title, content });
    if (postId) {
      return postId;
    } else throw new EntityNotFound('Author not found');
  }

  async delete(postId) {
    const deletedId = await this.postModel.delete({ postId });
    if (deletedId) {
      return deletedId;
    } else throw new EntityNotFound('Post not found');
  }

  async update(postId, title, content) {
    const post = await this.postModel.update({
      dto: filterDTO({ title, content }),
      conditions: { postId },
    });
    if (post) {
      return post;
    } else throw new EntityConflict('Unable to update post');
  }
}

module.exports = { PostService };
