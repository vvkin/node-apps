'use strict';

const { Router } = require('express');
const { PostModel } = require('../../models/post.model');
const { PostService } = require('../../services/post.service');
const makePostController = require('../controllers/post.controller');

module.exports = (database) => {
  const route = Router();

  const { createPost, getPostById, updatePostById, deletePostById } =
    makePostController(new PostService(new PostModel(database)));

  route.post('/', createPost);
  route.get('/:postId', getPostById);
  route.patch('/:postId', updatePostById);
  route.delete('/:postId', deletePostById);

  return route;
};
