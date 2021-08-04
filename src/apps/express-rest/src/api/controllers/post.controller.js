'use strict';

module.exports = (postService) => {
  const getPostById = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const post = await postService.findOne({ postId });
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  };

  const createPost = async (req, res, next) => {
    const { authorId, title, content } = req.body;
    try {
      const postId = await postService.create(authorId, title, content);
      res.status(201).json({ postId });
    } catch (err) {
      next(err);
    }
  };

  const updatePost = async (req, res, next) => {
    const { postId } = req.params;
    const { title, content } = req.body;
    try {
      const post = await postService.update(postId, title, content);
      res.status(200).json({ post });
    } catch (err) {
      next(err);
    }
  };

  const deletePostById = async (req, res, next) => {
    const { postId } = req.params;
    try {
      const deletedId = await postService.delete(postId);
      res.status(200).json({ postId: deletedId });
    } catch (err) {
      next(err);
    }
  };

  return { getPostById, createPost, updatePost, deletePostById };
};
