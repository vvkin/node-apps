'use strict';

const postService = require('../../services/post.service');

const getPost = async (req, res) => {
  const { postId } = req.params;
  try {
    const post = await postService.getPost(postId);
    if (post) res.status(200).json(post);
    else res.status(404).send();
  } catch (err) {
    res.status(404).send();
  }
};

const createPost = async (req, res) => {
  const { authorId, title, content } = req.body;
  try {
    const postId = await postService.createPost(authorId, title, content);
    res.status(201).json(postId);
  } catch (err) {
    res.status(500).send();
  }
};

const updatePost = async (req, res) => {
  const { title, content } = req.body;
  try {
    const success = await postService.updatePost(title, content);
    if (success) res.status(204).json(success);
    else res.status(404).send();
  } catch (err) {
    res.status(500).send();
  }
};

const deletePost = async (req, res) => {
  const { postId } = req.param;
  try {
    const success = await postService.deletePost(postId);
    if (success) res.code(200).send();
    else res.code(404).send();
  } catch (err) {
    res.status(500).send();
  }
};

module.exports = {
  getPost,
  createPost,
  updatePost,
  deletePost,
};
