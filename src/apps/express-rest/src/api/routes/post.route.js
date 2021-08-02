'use strict';

const { Router } = require('express');
const { PostModel } = require('../../models/post.model');
const { PostService } = require('../../services/post.service');
const makePostController = require('../controllers/post.controller');

module.exports = (database) => {
  const route = Router();

  const { createPost, getPostById, updatePost, deletePost } =
    makePostController(new PostService(new PostModel(database)));

  route.post('/', createPost);
  route.get('/:postId', getPostById);
  route.patch('/:postId', updatePost);
  route.delete('/:postId', deletePost);

  return route;
};
