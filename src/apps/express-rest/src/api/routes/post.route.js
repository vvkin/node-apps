'use strict';

const { Router } = require('express');
const postController = require('../controllers/post.controller');

const route = Router();

route.post('/', postController.createPost);
route.get('/:postId', postController.getPost);
route.patch('/:postId', postController.updatePost);
route.delete('/:postId', postController.deletePost);

module.exports = route;
