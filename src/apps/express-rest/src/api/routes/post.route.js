'use strict';

const { Router } = require('express');
const { PostModel } = require('../../models/post.model');
const { PostService } = require('../../services/post.service');
const postController = require('../controllers/post.controller');

module.exports = (db) => {
  const route = Router();

  const { createPost, getPostById, updatePost, deletePost } = postController(
    new PostService(new PostModel(db))
  );

  route.post('/', createPost);
  route.get('/:postId', getPostById);
  route.patch('/:postId', updatePost);
  route.delete('/:postId', deletePost);

  return route;
};
