'use strict';

const { NotFound, Conflict } = require('../../helpers/http-error');
const { PostService } = require('../../services/post.service');

const postService = new PostService();

const getPost = async (req, res, next) => {
  const { postId } = req.params;
  const post = await postService.getPost(postId);
  if (post) {
    res.status(200).json({ post });
  } else next(new NotFound('Post not found'));
};

const createPost = async (req, res, next) => {
  const { authorId, title, content } = req.body;
  const postId = await postService.createPost(authorId, title, content);
  if (postId) {
    res.status(201).json({ postId });
  } else next(new Conflict('Post already exists'));
};

const updatePost = async (req, res, next) => {
  const { title, content } = req.body;
  const success = await postService.updatePost(title, content);
  if (success) {
    res.status(200).json({ success });
  } else next(new NotFound('Post not found'));
};

const deletePost = async (req, res, next) => {
  const { postId } = req.param;
  const success = await postService.deletePost(postId);
  if (success) {
    res.status(200).json({ success });
  } else next(new NotFound('Post not found'));
};

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
};
