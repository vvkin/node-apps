'use strict';

const { Router } = require('express');
const { PostService } = require('../../services/post.service');
const makePostController = require('../controllers/post.controller');

module.exports = (postModel) => {
  const route = Router();

  const { createPost, getPostById, updatePostById, deletePostById } =
    makePostController(new PostService(postModel));

  route.post('/', createPost);
  route.get('/:postId', getPostById);
  route.patch('/:postId', updatePostById);
  route.delete('/:postId', deletePostById);

  return route;
};
