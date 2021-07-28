'use strict';

const { Router } = require('express');
const {
  getPost,
  updatePost,
  deletePost,
  createPost,
} = require('../controllers/post.controller');

const route = Router();

route.get('/:postId', getPost);
route.patch('/:postId', updatePost);
route.delete('/:postId', deletePost);
route.post('/', createPost);

module.exports = route;
